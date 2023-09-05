import { Express } from "express"
import { RegisterController } from "@/controllers/auth/RegisterController"
import { LoginController } from "@/controllers/auth/LoginController"
import { HomeController } from "@/controllers/HomeController"
import { UserController } from "@/controllers/UserController"
import { validator } from "@/middlewares/validator.middleware"

export const router = (app: Express) => {

    app.get('/', HomeController.index)

    // authentication
    app.post('/register', RegisterController.rules, validator, RegisterController.register)
    app.post('/login', LoginController.rules, validator, LoginController.authentication)

    // user
    app.route('/api/user')
        .get(UserController.index)
}
