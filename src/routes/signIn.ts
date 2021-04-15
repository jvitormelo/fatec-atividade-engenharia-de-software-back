import express from 'express'
import globalCatcher from '../utils/globalCatcher'
import SignInController from '../controllers/SignInController'

const router = express.Router()

const login = globalCatcher(async (req: any, res: any, next: any) => await SignInController.login(req, res))

router.post('/public/login', login)

export default router
