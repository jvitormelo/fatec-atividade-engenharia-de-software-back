import express from 'express'
import routes from './routes'
import cors from 'cors'
import userAgent from 'express-useragent'
import 'reflect-metadata'
import { logMiddleware } from './middlewares/log'
const app = express()
require('dotenv').config()

app.use(cors())
app.use(userAgent.express())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logMiddleware)
app.use(routes)

export default app

export interface IUser {
    id: number,
    name: string,
}

declare global {
    export namespace Express {
        export interface Request {
            user: IUser
        }
    }

}
