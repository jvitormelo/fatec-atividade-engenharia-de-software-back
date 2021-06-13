import AbstractController from './AbstractController'
import { NextFunction, Request } from 'express'

class ImagesController extends AbstractController {
  async index (req: Request, next: NextFunction): Promise<any> {
    return this.prisma.images.findMany({
      where: { userId: req.user.id }
    })
  }

  async find (req: Request, next: NextFunction): Promise<any> {
    const { id } = req.params

    return this.prisma.images.findUnique({ where: { id: Number(id) } })

  }

  async create (req: Request, next: NextFunction): Promise<any> {
    const {
      title,
      description,
      base64
    } = req.body
    return this.prisma.images.create({
      data: {
        description,
        title,
        userId: req.user.id,
        url: base64
      }
    })
  }

  async update (req: Request, next: NextFunction): Promise<any> {
    const {
      title,
      description,
      base64
    } = req.body
    const { id } = req.params
    return this.prisma.images.update({
      data: {
        description,
        title,
        userId: req.user.id,
        url: base64
      },
      where: { id: Number(id) }
    })
  }

  async destroy (req: Request, next: NextFunction): Promise<any> {
    const { id } = req.params
    return this.prisma.images.delete({ where: { id: Number(id) } })
  }
}

export default new ImagesController()
