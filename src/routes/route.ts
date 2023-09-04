import { Express } from "express"
import { HomeController } from "@/controllers/HomeController"

export const router = (app: Express): void => {

    app.get('/', HomeController.index)
}
