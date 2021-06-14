import globalCatcher from '../utils/globalCatcher'
import express, { NextFunction, Response } from 'express'
import { notAllowAdmin } from '../middlewares/authenticate'
import ImagesController from '../controllers/ImagesController'
const router = express.Router()

const index = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await ImagesController.index(req, next)
  res.json({ message: '', response })
})
const create = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await ImagesController.create(req, next)
  res.json({ message: 'Criado com sucesso', response })
})

const find = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await ImagesController.find(req, next)
  res.json({ message: '', response })
})
const update = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await ImagesController.update(req, next)
  res.json({ message: '', response })
})
const destroy = globalCatcher(async (req: any, res: Response, next: NextFunction) => {
  const response = await ImagesController.destroy(req, next)
  res.json({ message: 'Imagem deletada com sucesso', response })
})

router.post('/images', notAllowAdmin, create)
  .get('/images', index)
  .get('/images/:id', find)
  .put('/images/:id', update)
  .delete('/images/:id', destroy)

export default router
