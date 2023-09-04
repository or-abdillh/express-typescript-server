import { Response, Request } from "express"
import { PrismaClient } from "@prisma/client"
import { body, validationResult } from 'express-validator'
import { hash } from '@/utils/bcrypt.util'

const { user } = new PrismaClient()

export const UserController = {

    index(req: Request, res: Response) {

        return res.send('ok')
    },

    create: [
        // validation
        body('email').isEmail(), body('password').notEmpty(), body('name').notEmpty(),

        // handler
        async (req: Request, res: Response) => {

            // checks
            const validations = validationResult(req)

            if (!validations.isEmpty()) {
                return res.status(401).send({
                    status: false,
                    errors: validations.array()
                })
            }

            // parse body request
            const { email, password, name } = req.body

            try {
                // email duplicate check
                const isDuplicated = await user.findFirst({
                    where: {
                        email
                    }
                })

                if (isDuplicated) return res.status(403).send({
                    status: false,
                    errors: [
                        {
                            field: 'email',
                            message: 'Email has already taken'
                        }
                    ]
                })

                // creating
                const created: any = await user.create({
                    data: {
                        name,
                        email,
                        password: await hash(password),
                    }
                })

                // create response
                res.status(201).send({
                    status: true,
                    user: created
                })
            } catch (err) {
                return res.status(501).send({
                    status: false,
                    errors: err
                })
            }
        }
    ]
}
