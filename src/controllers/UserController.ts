import AbstractController from './AbstractController'
import { NextFunction, Request, Response } from 'express'
import ResponseFactory from '../services/ResponseFactory'
import { ErrorHandler } from '../services/errorAPI'

class UserController extends AbstractController {
  async index (req:Request, res:Response, next: NextFunction) {
    const response = await this.prisma.users.findMany()
    res.json(ResponseFactory.createResponse('Usuarios listados', response || []))
  }

  async find (req:Request, res:Response, next: NextFunction) {
    const { id } = req.params
    console.log(req.user.id)
    const user = await this.prisma.users.findFirst({ where: { id: Number(id) ? Number(id) : req.user.id } })
    if (!user) throw new ErrorHandler(404, 'Usuário não encontrado')
    res.json(ResponseFactory.createResponse('Usuário encontrado', user || {}))
  }

  async create (req:Request, res:Response, next: NextFunction) {
    const { name, email, password } = req.body
    const createdUser = await this.prisma.users.create({ data: { name, email, password } })
    res.json(ResponseFactory.createResponse('Usuário criado com sucesso', createdUser || {}))
  }

  async update (req:Request, res:Response, next: NextFunction) {
    const { name, email, password } = req.body
    const { id } = req.params
    const updatedUser = await this.prisma.users.update({ where: { id: Number(id) }, data: { name, email, password } })
    res.json(ResponseFactory.createResponse('Usuário atualizado com sucesso', updatedUser || {}))
  }

  async destroy (req:Request, res:Response, next: NextFunction) {
    const { id } = req.params
    const response = await this.prisma.users.delete({ where: { id: Number(id) } })
    res.json(ResponseFactory.createResponse('Usuário deletado com sucesso', response || {}))
  }
}
export default new UserController()
