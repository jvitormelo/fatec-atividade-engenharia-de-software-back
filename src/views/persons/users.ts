import express, { NextFunction, Response } from 'express'
import globalCatcher from '../../utils/globalCatcher'
import UserController from '../../controllers/persons/UserController'
const router = express.Router()

const index = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await UserController.index(req, next)
  res.json({ message: 'Usuários listados com sucesso!', response })
})
const find = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await UserController.find(req, next)
  res.json({ message: 'Usuário encontrado com sucesso!', response })
})
const create = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await UserController.create(req, next)
  res.json({ message: 'Usuário criado com sucesso!', response })
})
const update = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await UserController.update(req, next)
  res.json({ message: 'Usuário atualizado com sucesso!', response })
})
const destroy = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await UserController.destroy(req, next)
  res.json({ message: 'Usuário deletado com sucesso!', response })
})

router
  .post('/public/users', create)
  .get('/public/users', index)
  .get('/users/:id', find)
  .put('/users/:id', update)
  .delete('/users/:id', destroy)

export default router
