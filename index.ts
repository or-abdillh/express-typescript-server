import "module-alias/register"
import dotenv from 'dotenv'

dotenv.config()

// cores
import express, { Express } from "express"
import { router } from "@/routes/route"

const app: Express = express()
const PORT = process.env.PORT ?? 8000

router(app)

app.listen(PORT, () => {
    console.log(`⚡️[SERVER]: Server running at http://localhost:${PORT}`)
})