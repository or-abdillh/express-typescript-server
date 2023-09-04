import "module-alias/register"
import dotenv from 'dotenv'

dotenv.config()

// cores
import express, { Express } from "express"
import { router } from "@/routes/route"
import bodyParser from "body-parser"

// initial
const app: Express = express()
const PORT = process.env.PORT ?? 8000

// middleware
app.use(bodyParser.urlencoded({ extended: true }))

// routes
router(app)

// run the server
app.listen(PORT, () => {
    console.log(`⚡️[SERVER]: Server running at http://localhost:${PORT}`)
})