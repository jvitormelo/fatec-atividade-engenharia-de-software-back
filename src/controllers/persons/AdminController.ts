import AbstractController from '../AbstractController'
import { NextFunction, Request } from 'express'
import { ErrorHandler } from '../../services/errorAPI'

class AdminController extends AbstractController {
  async index (req:Request, next: NextFunction) {
    return await this.prisma.admins.findMany({ include: { person: { select: { id: true, name: true, email: true } } } })
  }

  async find (req:Request, next: NextFunction) {
    const { id } = req.params
    const user = await this.prisma.admins.findFirst({ where: { id: Number(id) ? Number(id) : req.user.id }, include: { person: { select: { id: true, name: true, email: true } } } })
    if (!user) throw new ErrorHandler(404, 'Usuário não encontrado')
    return user
  }

  async create (req: Request, next: NextFunction) {
    const { name, email, password, adminLevel } = req.body
    try {
      const createdPerson = await this.prisma.persons.create({ data: { name, email, password } })
      return await this.prisma.admins.create({
        data: { personId: createdPerson.id, adminLevel },
        include: { person: { select: { id: true, name: true, email: true } } }
      })
    } catch (e) {
      switch (e.code) {
        case 'P2002':
          throw new ErrorHandler(400, 'Email já utilizado')
        default:
          throw new ErrorHandler(500, 'Erro inesperado')
      }
    }
  }

  async update (req:Request, next: NextFunction) {
    const { name, email, password, adminLevel } = req.body
    const { id } = req.params

    const foundAdmin = await this.prisma.admins.findUnique({ where: { id: Number(id) || req.user.id } })
    if (!foundAdmin) throw new ErrorHandler(400, 'Id inválido')

    const [updatedPerson, updatedAdmin] = await Promise.all([
      this.prisma.persons.update({
        data: {
          name,
          email,
          password
        },
        select: { id: true, email: true, name: true, createdAt: true },
        where: { id: foundAdmin.personId }
      }),
      this.prisma.admins.update({ where: { id: Number(id) }, data: { adminLevel } })
    ])

    return { ...updatedAdmin, person: updatedPerson }
  }

  async destroy (req:Request, next: NextFunction) {
    const { id } = req.params
    const foundAdmin = await this.prisma.admins.findFirst({ where: { id: Number(id) } })
    if (!foundAdmin) throw new ErrorHandler(400, 'Usuário não encontrado')
    const [deletedAdmin, deletedPerson] = await Promise.all([this.prisma.admins.delete({ where: { id: Number(id) }, include: { person: true } }), this.prisma.persons.delete({ where: { id: foundAdmin?.personId } })])
    return { ...deletedAdmin, person: deletedPerson }
  }
}
export default new AdminController()
