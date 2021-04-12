import AbstractController from './AbstractController'
import { User } from '../database/typeORM/entity'
import { getRepository } from 'typeorm'

class UserController extends AbstractController {
  async index (req:any, res:any, next: any) {
    res.json({ token: '123' })
  }

  async find (req:any, res:any, next: any) {}
  async create (req:any, res:any, next: any) {
    const { name, password, email } = req.body
    const userRepo = await getRepository(User)
    await userRepo.save({
      name, password, email
    })
    res.json({ name, password, email })
  }

  async update (req:any, res:any, next: any) {}
  async destroy (req:any, res:any, next: any) {}
  async login (req:any, res:any, next: any) {}
}

export default new UserController()
