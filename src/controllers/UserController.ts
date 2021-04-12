import AbstractController from './AbstractController'
import { Users } from '../database/typeORM/entity'
import { getRepository, getManager } from 'typeorm'

class UserController extends AbstractController {
  async index (req:any, res:any, next: any) {
    res.json({ token: '123' })
  }

  async find (req:any, res:any, next: any) {}
  async create (req:any, res:any, next: any) {
    const { name, password, email } = req.body
    const manager = getManager()
    const createdUser = await manager.save(Users, { name, password, email })
    // const usersRepository = getRepository(Users)
    // const createdUser = usersRepository.save({ name, password, email })
    res.json({ createdUser })
  }

  async update (req:any, res:any, next: any) {}
  async destroy (req:any, res:any, next: any) {}
  async login (req:any, res:any, next: any) {}
}

export default new UserController()
