import dotenv from "dotenv"

dotenv.config({ path: process.cwd() + '/.env' })

type AppConfig = {
    port: number
    jwtSecret: string
    jwtExpires: string
    bcryptSaltRounds: number
}

// exported config
export const useAppConfig = (): AppConfig => {
    return {
        // server
        port: process.env.PORT ?? 8000,

        // JWT
        jwtSecret: process.env.JWT_SECRET ?? 'jwt secret',
        jwtExpires: '2h',

        // Bcrypt
        bcryptSaltRounds: 10
    } as AppConfig
}