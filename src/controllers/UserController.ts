import AbstractController from './AbstractController'
import { User } from '../database/typeORM/entity'
import { EntityManager, getManager, getRepository } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import ResponseFactory from '../services/ResponseFactory'

class UserController extends AbstractController {
  private manager: EntityManager

  constructor () {
    super()
    this.manager = this.getManager()
  }

  getManager () {
    const manager = getManager('users')
    return manager
  }

  async index (req: Request, res: Response, next: NextFunction) {
    const indexedUsers = await this.manager.find('users')
    res.json(ResponseFactory.createResponse('Usuários listados com sucesso', indexedUsers))
  }

  async find (req: Request, res: Response, next: NextFunction) {
    const foundUser = await this.manager.findByIds('users', [req.params.id])

    if (!foundUser) {
      res.json(ResponseFactory.createResponse('Não foi possível encontrar esse usuário', {}))
    } else {
      res.json(ResponseFactory.createResponse('Usuário encontrado com sucesso', foundUser))
    }
  }

  async create (req: any, res: any, next: any) {
    const {
      name,
      password,
      email
    } = req.body
    const userRepo = await getRepository(User)
    const createdUser = await userRepo.save({
      name,
      password,
      email
    })
    res.json({ createdUser: createdUser || {} })
  }

  async update (req: Request, res: Response, next: NextFunction) {
    const { name, password, email } = req.body

    const updatedUser = await this.manager.update('users', { email }, { name, password, email })

    res.json(ResponseFactory.createResponse('Usuário atualizado com sucesso', updatedUser))
  }

  async destroy (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    const destroyedUser = await this.manager.delete('users', id)

    res.json(ResponseFactory.createResponse('Usuário deletado com sucesso', destroyedUser))
  }

  // TODO: LOGIN E CONTROLE DE SESSÃO NÃO FAZEM PARTE DA ENTIDADE DE USUÁRIO
  async login (req: any, res: any, next: any) {
  }
}

export default new UserController()
