import { PrismaClient } from "@prisma/client"
import { body, validationResult } from "express-validator"
import { Response, Request } from "express"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// model
const { user: User } = new PrismaClient()

// interfaces
interface LoginRequest extends Request {
    body: {
        email: string
        password: string
    }
}

type Payload = {
    name: string
    email: string
}

type Authenticated = {
    name: string
    password: string
    email: string
}

export const LoginController = {

    // validation rules
    rules: [
        body('email').isEmail(),
        body('password').notEmpty(),
    ],

    async emailAuthenticated(email: string) {

        return await User.findFirst({ where: { email } })
    },

    generateToken(payload: Payload): string {

        return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' })
    },

    userAuthenticated(password: string, authenticated: Authenticated, res: Response) {

        compare(password, authenticated.password, (err, same): Response => {
            if (same) {
                // user authenticated
                return res.status(200).send({
                    status: true,
                    message: 'valid credential',
                    data: {
                        token: LoginController.generateToken({
                            name: authenticated.name,
                            email: authenticated.email
                        })
                    }
                })
            }
            else {
                return res.status(403).send({
                    status: false,
                    message: 'invalid credential',
                    errors: [{ field: 'password', msg: 'password uncorrectly' }]
                })
            }
        })
    },

    // main
    async authentication(req: LoginRequest, res: Response): Promise<Response | undefined> {

        // check
        const validations = validationResult(req)

        if (!validations.isEmpty()) {
            return res.status(401).send({
                status: false,
                message: 'Validation body error',
                errors: validations.array()
            })
        }

        // parse body
        const { email, password } = req.body

        // email validation
        const isEmailAuthenticated = await LoginController.emailAuthenticated(email)

        if (!isEmailAuthenticated) {
            return res.status(404).send({
                status: false,
                message: 'not found',
                errors: [{ field: 'email', msg: 'cannot find user with this email' }]
            })
        }

        // comparing password
        LoginController.userAuthenticated(password, isEmailAuthenticated as Authenticated, res)
    }
}
