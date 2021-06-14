import AbstractController from './AbstractController'
import { NextFunction, Request } from 'express'
import { ErrorHandler } from '../services/errorAPI'
import Token from '../services/Token'

class SignInController extends AbstractController {
  async login (req: Request, next: NextFunction) {
    const { email, password, type = 'user' } = req.body

    let user
    if (type === 'user') {
      user = await this.prisma.users.findFirst({
        include: { person: true },

        where: {
          person: { email }
        }
      })
    } else {
      user = await this.prisma.admins.findFirst({
        include: { person: true },
        where: {
          person: { email }
        }
      })
    }

    if (!user) throw new ErrorHandler(404, 'Usuário não encontrado')

    if (user.person.password !== password) { throw new ErrorHandler(404, 'Usuário ou senha incorretos') }
    const token = await Token.create({
      id: user.id,
      name: user.person.name,
      type
    })
    // @ts-ignore
    delete user.person.password
    return { token, user }
  }
}
export default new SignInController()
