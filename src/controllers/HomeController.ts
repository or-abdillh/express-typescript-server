'use strict'

import { Request, Response } from "express"
import { Car } from "@/ts/interfaces/car.interface"

export const HomeController = {

    index(req: Request, res: Response): Response {

        const car: Car = {
            name: 'Honda Jazz',
            speed: {
                minimum: 100,
                maximum: 210
            }
        }
        return res.send(car)
    }
}
