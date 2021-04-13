import { NextFunction, Request, Response } from 'express'

class AbstractController {
  async index (req:Request, res:Response, next: NextFunction):Promise<void> {}
  async find (req:Request, res:Response, next: NextFunction):Promise<void> {}
  async create (req:Request, res:Response, next: NextFunction):Promise<void> {}
  async update (req:Request, res:Response, next: NextFunction):Promise<void> {}
  async destroy (req:Request, res:Response, next: NextFunction):Promise<void> {}
}
export default AbstractController
