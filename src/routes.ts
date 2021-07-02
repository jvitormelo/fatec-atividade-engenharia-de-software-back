import express, { Response } from 'express'
import userRoutes from './views/persons/users'
import adminRoutes from './views/persons/admins'
import imageRoutes from './views/images'
import signInRoutes from './views/signIn'
import personRoutes from './views/persons/persons'
import logRoutes from './views/logs'
import { handleError } from './services/errorAPI'
import { authenticateMiddleware } from './middlewares/authenticate'
import { logMiddleware } from './middlewares/requestLogger'

const router = express.Router()

router.use(authenticateMiddleware)
router.use(logMiddleware)
router.use(userRoutes)
router.use(imageRoutes)
router.use(personRoutes)
router.use(adminRoutes)
router.use(signInRoutes)
router.use(logRoutes)
router.use((err: any, req: any, res: Response, next:any) => handleError(err, res))
router.use(('/'), (req:any, res:any) => res.json({ message: 'rota não encontrada' }))

export default router
