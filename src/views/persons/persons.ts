import globalCatcher from '../../utils/globalCatcher'
import { NextFunction, Response } from 'express'
import router from './admins'
import PersonController from '../../controllers/persons/PersonController'

const find = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await PersonController.find(req, next)
  res.json({ message: 'Pessoa encontrado ccom sucesso!', response })
})
router

  .get('/persons', find)

export default router
