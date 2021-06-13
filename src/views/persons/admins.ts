import express, { NextFunction, Response } from 'express'
import globalCatcher from '../../utils/globalCatcher'
import AdminController from '../../controllers/persons/AdminController'
import { authenticateAdmin } from '../../middlewares/authenticate'

const router = express.Router()

const index = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await AdminController.index(req, next)
  res.json({ message: 'Administradores  listados com sucesso!', response })
})
const find = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await AdminController.find(req, next)
  res.json({ message: 'Administrador encontrado com sucesso!', response })
})
const create = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await AdminController.create(req, next)
  res.json({ message: 'Administrador criado com sucesso!', response })
})
const update = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await AdminController.update(req, next)
  res.json({ message: 'Administrador atualizado com sucesso!', response })
})
const destroy = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await AdminController.destroy(req, next)
  res.json({ message: 'Administrador deletado com sucesso!', response })
})

router
  .post('/public/admins', create)
  .get('/admins', authenticateAdmin, index)
  .get('/admins/:id', authenticateAdmin, find)
  .put('/admins/:id', authenticateAdmin, update)
  .delete('/admins/:id', authenticateAdmin, destroy)

export default router
