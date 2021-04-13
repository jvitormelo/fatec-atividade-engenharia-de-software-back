import AbstractController from './AbstractController'
import { getRepository } from 'typeorm'
import { Users } from '../database/typeORM/entity/Users'
import { Request, Response } from 'express'
import { ErrorHandler } from '../services/errorAPI'
import ResponseFactory from '../services/ResponseFactory'

class SignInController extends AbstractController {
  async login (req: Request, res: Response) {
    const { email, password } = req.body
    const user = await getRepository(Users).findOne(email, password)
    if (!user) throw new ErrorHandler(404, ' Usuário não encontrado')
    res.json(ResponseFactory.createResponse('Usuário encontrado com sucesso', {}))
  }
}
export default new SignInController()
