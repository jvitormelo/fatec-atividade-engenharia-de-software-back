import AbstractController from '../AbstractController'
import { NextFunction, Request } from 'express'
import { ErrorHandler } from '../../services/errorAPI'
import Token from '../../services/Token'

class UserController extends AbstractController {
  async index (req: Request, next: NextFunction) {
    return await this.prisma.users.findMany({
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        images: true
      }
    })
  }

  async find (req: Request, next: NextFunction) {
    const { id } = req.params
    const user = await this.prisma.users.findFirst({
      where: { id: Number(id) ? Number(id) : req.user.id },
      include: {
        person: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    if (!user) throw new ErrorHandler(404, 'Usuário não encontrado')
    return user
  }

  async create (req: Request, next: NextFunction) {
    const {
      name,
      email,
      password
    } = req.body
    try {
      const createdPerson = await this.prisma.persons.create({
        data: {
          name,
          email,
          password
        }
      })
      const createdUser = await this.prisma.users.create({
        data: { personId: createdPerson.id },
        include: {
          person: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })
      const token = await Token.create({ id: createdUser.id, name: createdUser.person.name, type: 'user' })
      return { user: createdUser, token }
    } catch (e) {
      switch (e.code) {
        case 'P2002':
          throw new ErrorHandler(400, 'Email ja utilizado')
      }
      throw new ErrorHandler(500, 'Erro inesperado')
    }
  }

  async update (req: Request, next: NextFunction) {
    const {
      name,
      email,
      password
    } = req.body
    const { id } = req.params

    const foundUser = await this.prisma.users.findUnique({ where: { id: Number(id) || req.user.id } })
    if (!foundUser) throw new ErrorHandler(400, 'Id inválido')

    const updatedPerson = await this.prisma.persons.update({
      data: {
        name,
        email,
        password
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      },
      where: { id: foundUser.personId }
    })

    return {
      ...foundUser,
      person: updatedPerson
    }
  }

  async destroy (req: Request, next: NextFunction) {
    const { id } = req.params
    const foundUser = await this.prisma.users.findFirst({ where: { id: Number(id) } })
    if (!foundUser) throw new ErrorHandler(400, 'Usuário não encontrado')
    const [deletedUser, deletedPerson, deletedImages] = await Promise.all([this.prisma.users.delete({
      where: { id: Number(id) },
      include: { person: true }
    }),
    this.prisma.persons.delete({ where: { id: foundUser?.personId } }),
    this.prisma.images.deleteMany({ where: { userId: Number(id) } })]
    )
    return {
      ...deletedUser,
      person: deletedPerson,
      deletedImages
    }
  }
}

export default new UserController()
