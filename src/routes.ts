import express, { Response } from 'express'
import userRoutes from './routes/users'
import signInRoutes from './routes/signIn'
import { handleError } from './services/errorAPI'
import { authenticateMiddleware } from './middlewares/authenticate'

const router = express.Router()

router.use(authenticateMiddleware)

router.use(userRoutes)
router.use(signInRoutes)
router.use((err: any, req: any, res: Response, next:any) => handleError(err, res))
router.use(('/'), (req:any, res:any) => res.json({ message: 'rota não encontrada' }))

export default router
