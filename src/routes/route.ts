import { Express } from "express"
import { RegisterController } from "@/controllers/auth/RegisterController"
import { HomeController } from "@/controllers/HomeController"
import { UserController } from "@/controllers/UserController"

export const router = (app: Express): void => {

    app.get('/', HomeController.index)

    // register
    app.post('/register', RegisterController.rules, RegisterController.register)

    // user
    app.route('/api/user')
        .get(UserController.index)
}
