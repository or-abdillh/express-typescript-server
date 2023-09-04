import express, { Express, Request, Response } from "express"
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT ?? 8000

app.get('/', (req: Request, res: Response) => {
    res.send('Node JS Server using Express and Typescript!')
})

app.listen(PORT, () => {
    console.log(`⚡️[SERVER]: Server running at http://localhost:${PORT}`)
})