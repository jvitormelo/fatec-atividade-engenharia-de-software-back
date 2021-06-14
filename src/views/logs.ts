import globalCatcher from '../utils/globalCatcher'
import { Response } from 'express'
import router from './signIn'
import LogsController from '../controllers/LogsController'

const index = globalCatcher(async (req: any, res: Response, next: any) => {
  const response = await LogsController.index(req, next)
  res.json({
    message: 'Logs listados',
    response
  })
})

router.get('/logs', index)

export default router
