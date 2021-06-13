import { NextFunction, Request } from 'express'
import { PrismaClient } from '@prisma/client'

class AbstractController {
  public prisma: PrismaClient
  constructor (prisma = new PrismaClient()) {
    this.prisma = prisma
  }

  async index (req:Request, next: NextFunction):Promise<any> {}
  async find (req:Request, next: NextFunction):Promise<any> {}
  async create (req:Request, next: NextFunction):Promise<any> {}
  async update (req:Request, next: NextFunction):Promise<any> {}
  async destroy (req:Request, next: NextFunction):Promise<any> {}
}
export default AbstractController
