import express, { Response } from 'express'
import userRoutes from './routes/users'
import { handleError } from './services/errorAPI'
import { authenticateMiddleware } from './middlewares/authenticate'
const router = express.Router()

router.use(authenticateMiddleware)
router.use(userRoutes)
router.use((err: any, req: any, res: Response, next: any) => handleError(err, res))

export default router
