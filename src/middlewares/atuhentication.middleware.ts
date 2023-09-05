import { Response, Request, NextFunction } from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { useHeader } from "@/utils/header.util"

dotenv.config()

export const useAuthentication = (req: Request, res: Response, next: NextFunction): any => {

    if (!req.headers?.authorization) {
        return res.status(400).send({
            status: false,
            message: 'Authorization is required at headers'
        })
    }

    // get token from headers
    const token: string = useHeader.getTokenFrom(req) as string

    // verify the token
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                status: false,
                message: 'Invalid token',
                errors: err
            })
        } else next()
    })
}
