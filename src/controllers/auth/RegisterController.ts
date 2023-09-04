import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"
import { hash } from "@/utils/bcrypt.util"

// Models
const { user: User } = new PrismaClient()

export const RegisterController = {

    // validation rules
    rules: [
        body('email').isEmail(),
        body('password').notEmpty(),
        body('name').notEmpty(),
    ],

    // duplicate email taken checker
    async isUserDuplicated(email: string): Promise<boolean> {

        const user = await User.findFirst({ where: { email } })

        return user ? true : false
    },

    // register new user
    async register(req: Request, res: Response) {

        // checks
        const validations = validationResult(req)

        if (!validations.isEmpty()) {
            return res.status(401).send({
                status: false,
                message: 'Validation body error',
                errors: validations.array()
            })
        }

        // parse body request
        const { email, password, name } = req.body

        try {
            // duplicate checker
            if (await RegisterController.isUserDuplicated(email)) {
                return res.status(403).send({
                    status: false,
                    message: 'Email has already taken by different user'
                })
            }

            // creating
            const user: any = await User.create({
                data: {
                    name,
                    email,
                    password: await hash(password),
                }
            })

            // create response
            res.status(201).send({
                status: true,
                message: 'User has created',
                data: { user }
            })
        } catch (err) {
            console.log(err)
            return res.status(501).send({
                status: false,
                message: 'Internal Server Error',
                errors: err
            })
        }
    }
}
