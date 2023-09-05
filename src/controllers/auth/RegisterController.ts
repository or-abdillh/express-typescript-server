import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { ValidationChain, body } from "express-validator"
import { hash } from "@/utils/bcrypt.util"

// Models
const { user: User } = new PrismaClient()

// form validations
const rules: Array<ValidationChain> = [

    // email
    body('email')
        .isEmail().withMessage('Incorrect email address format')
        .custom(async (email: string) => {
            const isEmailAlready = await User.findFirst({ where: { email } })

            if (isEmailAlready) {
                throw new Error('Email already in use')
            }
        }),

    // password
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Password minimum length 8 characters'),
    body('password_confirmation')
        .notEmpty().withMessage('Password confirmation is required')
        .custom(async (password: string, { req }) => {
            if (password !== req.body.password) {
                throw new Error('Password confirmation is not match')
            }
        }),

    // name
    body('name').notEmpty().withMessage('Field name is required'),
]

// main controller
export const RegisterController = {

    // validation rules
    rules,

    // register new user
    async register(req: Request, res: Response): Promise<Response | undefined> {

        // parse body request
        const { email, password, name } = req.body

        try {
            // creating
            const user: any = await User.create({
                data: {
                    name,
                    email,
                    password: await hash(password),
                }
            })

            // create response
            return res.status(201).send({
                status: true,
                message: 'User has created',
                data: { user }
            })
        } catch (err) {
            return res.status(501).send({
                status: false,
                message: 'Internal Server Error',
                errors: err
            })
        }
    }
}
