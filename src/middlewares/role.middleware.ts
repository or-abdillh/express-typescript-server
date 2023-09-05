import { useAppConfig } from "@config/app.config"
import { useHeader } from "@/utils/header.util"
import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

// initial
const config = useAppConfig()
const { user: User } = new PrismaClient()

type Decoded = {
    name: string
    email: string
    iat: number
    exp: number
}

export const useRole = {

    guard(...roles: string[]) {

        return (req: Request, res: Response, next: NextFunction) => {

            // get current token from request
            const token: string = useHeader.getTokenFrom(req) as string

            // verify
            jwt.verify(token, config.jwtSecret, async (err, decoded) => {

                if (err) {
                    return res.status(403).send({
                        status: false,
                        message: 'Invalid token',
                        errors: err
                    })
                }

                // parse decoded
                const { email } = decoded as Decoded

                // get user by this email
                const user = await User.findFirst({
                    where: { email },
                    include: {
                        role: true
                    }
                })

                if (user) {
                    if (roles.includes(user.role.name)) next()
                    else {
                        // invalid role match
                        return res.status(403).send({
                            status: false,
                            message: 'Forbidden role',
                            data: {
                                allowedRoles: roles,
                                currentRole: user.role.name
                            }
                        })
                    }
                } else {
                    return res.status(404).send({
                        status: false,
                        message: 'User not found'
                    })
                }
            })
        }
    }

}
