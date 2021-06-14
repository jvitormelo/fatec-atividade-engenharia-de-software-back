import AbstractController from './AbstractController'
import { NextFunction } from 'express'

class LogsController extends AbstractController {
  async index (req: any, next: NextFunction): Promise<any> {
    return this.prisma.logs.findMany()
  }
}
export default new LogsController()
