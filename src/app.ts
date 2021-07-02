import express from 'express'
import routes from './routes'
import cors from 'cors'
import 'reflect-metadata'
import userAgent from 'express-useragent'

const app = express()
require('dotenv').config()

app.use(cors())
app.use(userAgent.express())
app.use(express.json({ limit: '50mb' }))

app.use(express.urlencoded({ extended: false }))

app.use(routes)

export default app

export interface IUser {
    id: number,
    type: string,
    name: string,
}

declare global {
    export namespace Express {
        export interface Request {
            user: IUser
        }
    }

}
