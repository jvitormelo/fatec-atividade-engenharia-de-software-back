import AbstractController from './AbstractController'
import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Users } from '../database/typeORM/entity/Users'
import ResponseFactory from '../services/ResponseFactory'
import { ErrorHandler } from '../services/errorAPI'

class UserController extends AbstractController {
  async index (req:Request, res:Response, next: NextFunction) {
    const response = await getRepository(Users).find()
    res.json(ResponseFactory.createResponse('Usuarios listados', response || []))
  }

  async find (req:Request, res:Response, next: NextFunction) {
    const { id } = req.params
    const user = await getRepository(Users).findOne(id)
    if (!user) throw new ErrorHandler(404, 'Usuário não encontrado')
    res.json(ResponseFactory.createResponse('Usuário encontrado', user || {}))
  }

  async create (req:Request, res:Response, next: NextFunction) {
    const { name, email, password } = req.body
    const createdUser = await getRepository(Users).save({ name, email, password })
    res.json(ResponseFactory.createResponse('Usuário criado com sucesso', createdUser || {}))
  }

  async update (req:Request, res:Response, next: NextFunction) {
    const { name, email, password } = req.body
    const { id } = req.params
    const updatedUser = await getRepository(Users).update({ id: Number(id) }, { name, email, password })
    res.json(ResponseFactory.createResponse('Usuário atualizado com sucesso', updatedUser || {}))
  }

  async destroy (req:Request, res:Response, next: NextFunction) {
    const { id } = req.params
    const response = getRepository(Users).delete({ id: Number(id) })
    res.json(ResponseFactory.createResponse('Usuário deletado com sucesso', response || {}))
  }
}
export default new UserController()
