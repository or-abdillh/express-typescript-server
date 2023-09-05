import { PrismaClient } from "@prisma/client"
import { body, ValidationChain } from "express-validator"
import { Response, Request } from "express"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { useAppConfig } from "@config/app.config"
import { IUser } from "@/ts/interfaces/user.interface"

// config
const config = useAppConfig()

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

// form validation
const rules: Array<ValidationChain> = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Incorrectly email adress format'),

    body('password').notEmpty().withMessage('Password is required'),
]

export const LoginController = {

    // validation rules
    rules,

    async emailAuthenticated(email: string): Promise<IUser | null> {

        return await User.findFirst({ where: { email } })
    },

    generateToken(payload: Payload): string {

        return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpires })
    },

    userAuthenticated(password: string, authenticated: IUser, res: Response): void {

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
                    errors: [{ type: 'field', path: 'password', msg: 'password uncorrectly', value: password }]
                })
            }
        })
    },

    // main
    async authentication(req: LoginRequest, res: Response): Promise<Response | undefined> {

        // parse body
        const { email, password } = req.body

        // email validation
        const isEmailAuthenticated = await LoginController.emailAuthenticated(email)

        if (!isEmailAuthenticated) {
            return res.status(404).send({
                status: false,
                message: 'not found',
                errors: [{ type: 'field', path: 'email', msg: 'cannot find user with this email', value: email }]
            })
        }

        // comparing password
        LoginController.userAuthenticated(password, isEmailAuthenticated, res)
    }
}
