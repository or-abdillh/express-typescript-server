import dotenv from "dotenv"

dotenv.config({ path: process.cwd() + '/.env' })

// exported config
export const useAppConfig = () => {
    return {
        // server
        port: process.env.PORT ?? 8000,

        // JWT
        jwtSecret: process.env.JWT_SECRET ?? 'jwt secret',
        jwtExpires: '2h',

        // Bcrypt
        bcryptSaltRounds: 10,

        // headers authorization
        headersAuthorization: {

            key: 'authorization',
            spliter: 'Bearer'
        }
    }
}