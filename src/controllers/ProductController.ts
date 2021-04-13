import AbstractController from './AbstractController'
import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Products } from '../database/typeORM/entity/Products'
import ResponseFactory from '../services/ResponseFactory'
import { ErrorHandler } from '../services/errorAPI'

class ProductController extends AbstractController {
  async index (req:Request, res:Response, next: NextFunction) {
    const response = await getRepository(Products).find()
    res.json(ResponseFactory.createResponse('Produtos listados', response || []))
  }

  async find (req:Request, res:Response, next: NextFunction) {
    const { id } = req.params
    const user = await getRepository(Products).findOne(id)
    if (!user) throw new ErrorHandler(404, 'Usuário não encontrado')
    res.json(ResponseFactory.createResponse('Produto encontrado', user || {}))
  }

  async create (req:Request, res:Response, next: NextFunction) {
    const { name, category, description, price } = req.body
    const createdUser = await getRepository(Products).save({ name, category, description, price })
    res.json(ResponseFactory.createResponse('Produto criado com sucesso', createdUser || {}))
  }

  async update (req:Request, res:Response, next: NextFunction) {
    const { name, category, description, price } = req.body
    const { id } = req.params
    const updatedUser = await getRepository(Products).update({ id: Number(id) }, { name, category, description, price })
    res.json(ResponseFactory.createResponse('Produto atualizado com sucesso', updatedUser || {}))
  }

  async destroy (req:Request, res:Response, next: NextFunction) {
    const { id } = req.params
    const response = getRepository(Products).delete({ id: Number(id) })
    res.json(ResponseFactory.createResponse('Produto deletado com sucesso', response || {}))
  }
}
export default new ProductController()
