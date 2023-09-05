// cores
import "module-alias/register"
import { PrismaClient } from "@prisma/client"
import express, { Express } from "express"
import { router } from "@/routes/route"
import bodyParser from "body-parser"
import { useAppConfig } from "@config/app.config"
import { useAuthentication } from "@/middlewares/atuhentication.middleware"

// initial
const config = useAppConfig()

const app: Express = express()
const PORT = config.port
const prismaClient = new PrismaClient()

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/', useAuthentication)

// routes
router(app)

// run the server
app.listen(PORT, async () => {
    try {
        // try connected with database
        console.log('🚀 [PRISMA]: Preparing connection ...')

        await prismaClient.$connect()

        console.log('🚀 [PRISMA]: Database connected')
        console.log(`⚡️ [SERVER]: Server running at http://localhost:${PORT}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
})