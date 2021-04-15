import AbstractController from './AbstractController'
import { getRepository } from 'typeorm'
import { Users } from '../database/typeORM/entity/Users'
import { Request, Response } from 'express'
import { ErrorHandler } from '../services/errorAPI'
import ResponseFactory from '../services/ResponseFactory'
import Token from '../services/Token'

class SignInController extends AbstractController {
  async login (req: Request, res: Response) {
    const { email, password } = req.body
    const user = await getRepository(Users).findOne({ email })
    if (!user) throw new ErrorHandler(404, 'Usuário não encontrado')
    if (user.password !== password) throw new ErrorHandler(404, 'Usuário ou senha incorretos')
    const token = await Token.create({ id: user.id, name: user.name })
    res.json(ResponseFactory.createResponse('Usuário encontrado com sucesso', { token, user }))
  }
}
export default new SignInController()
