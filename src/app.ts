import express from 'express'
import routes from './routes'
import cors from 'cors'
import 'reflect-metadata'
const app = express()
require('dotenv').config()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))
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
