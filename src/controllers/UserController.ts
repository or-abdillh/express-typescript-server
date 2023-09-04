import { Response, Request } from "express"
import { PrismaClient } from "@prisma/client"
import { body, validationResult } from 'express-validator'
import { hash } from '@/utils/bcrypt.util'

const { user } = new PrismaClient()

export const UserController = {

    index(req: Request, res: Response) {

        return res.send('ok')
    }
}
