import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export const useValidator = (req: Request, res: Response, next: NextFunction) => {

    // get results from validations rule
    const validations = validationResult(req)

    if (validations.isEmpty()) next()
    else {
        return res.status(400).send({
            status: false,
            message: 'Validation Error',
            errors: validations.array()
        })
    }
}
