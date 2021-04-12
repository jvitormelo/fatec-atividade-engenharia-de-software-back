import express from 'express'
import globalCatcher from '../utils/globalCatcher'
import UserController from '../controllers/UserController'
const router = express.Router()

const index = globalCatcher(async (req: any, res: any, next: any) => UserController.index(req, res, next))
const find = globalCatcher(async (req: any, res: any, next: any) => UserController.find(req, res, next))
const create = globalCatcher(async (req: any, res: any, next: any) => UserController.create(req, res, next))
const update = globalCatcher(async (req: any, res: any, next: any) => UserController.update(req, res, next))
const destroy = globalCatcher(async (req: any, res: any, next: any) => UserController.destroy(req, res, next))
const login = globalCatcher(async (req: any, res: any, next: any) => UserController.login(req, res, next))

router.get('/public/users', index)
router.get('/users/:id', find)
router.post('/public/users', create)
router.put('/users', update)
router.delete('/users/:id', destroy)
router.post('/public/login/user', login)

export default router
