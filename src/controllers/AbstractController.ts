import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

class AbstractController {
  public prisma: PrismaClient
  constructor (prisma = new PrismaClient()) {
    this.prisma = prisma
  }

  async index (req:Request, res:Response, next: NextFunction):Promise<void> {
  }

  async find (req:Request, res:Response, next: NextFunction):Promise<void> {}
  async create (req:Request, res:Response, next: NextFunction):Promise<void> {}
  async update (req:Request, res:Response, next: NextFunction):Promise<void> {}
  async destroy (req:Request, res:Response, next: NextFunction):Promise<void> {}
}
export default AbstractController
