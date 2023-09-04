import { Express } from "express"
import { RegisterController } from "@/controllers/auth/RegisterController"
import { LoginController } from "@/controllers/auth/LoginController"
import { HomeController } from "@/controllers/HomeController"
import { UserController } from "@/controllers/UserController"

export const router = (app: Express): void => {

    app.get('/', HomeController.index)

    // authentication
    app.post('/register', RegisterController.rules, RegisterController.register)
    app.post('/login', LoginController.rules, LoginController.authentication)

    // user
    app.route('/api/user')
        .get(UserController.index)
}
