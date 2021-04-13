import express from 'express'
import globalCatcher from '../utils/globalCatcher'
import UserController from '../controllers/UserController'
const router = express.Router()

const index = globalCatcher(async (req: any, res: any, next: any) => await UserController.index(req, res, next))
const find = globalCatcher(async (req: any, res: any, next: any) => await UserController.find(req, res, next))
const create = globalCatcher(async (req: any, res: any, next: any) => await UserController.create(req, res, next))
const update = globalCatcher(async (req: any, res: any, next: any) => await UserController.update(req, res, next))
const destroy = globalCatcher(async (req: any, res: any, next: any) => await UserController.destroy(req, res, next))

router.get('/public/users', index)
router.get('/users/:id', find)
router.post('/public/users', create)
router.put('/users', update)
router.delete('/users/:id', destroy)

export default router
