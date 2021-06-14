import AbstractController from '../AbstractController'
import { NextFunction, Request } from 'express'

class PersonController extends AbstractController {
  async find (req :Request, next: NextFunction): Promise<any> {
    const foundPerson = await this.prisma.persons.findFirst({
      where: {
        admin: {
          id: req.user.type === 'admin' ? req.user.id : undefined
        },
        user: {
          id: req.user.type === 'user' ? req.user.id : undefined
        }
      },
      include: {
        admin: req.user.type === 'admin',
        user: req.user.type === ' user'
      }
    })
    return { ...foundPerson, type: req.user.type }
  }
}
export default new PersonController()
