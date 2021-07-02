import express, { Response } from 'express'
import globalCatcher from '../utils/globalCatcher'
import SignInController from '../controllers/SignInController'

const router = express.Router()

const login = globalCatcher(async (req: any, res: Response, next: any) => {
  const response = await SignInController.login(req, next)
  res.json({
    message: 'Login realizado com sucesso',
    response
  })
})

router.post('/public/login', login)

export default router
