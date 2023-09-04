import { Express } from "express"
import { HomeController } from "@/controllers/HomeController"
import { UserController } from "@/controllers/UserController"

export const router = (app: Express): void => {

    app.get('/', HomeController.index)

    // user
    app.route('/api/user')
        .post(UserController.create)
        .get(UserController.index)
}
