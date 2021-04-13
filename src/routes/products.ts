import express from 'express'
import globalCatcher from '../utils/globalCatcher'
import ProductController from '../controllers/ProductController'
const router = express.Router()

const index = globalCatcher(async (req: any, res: any, next: any) => await ProductController.index(req, res, next))
const find = globalCatcher(async (req: any, res: any, next: any) => await ProductController.find(req, res, next))
const create = globalCatcher(async (req: any, res: any, next: any) => await ProductController.create(req, res, next))
const update = globalCatcher(async (req: any, res: any, next: any) => await ProductController.update(req, res, next))
const destroy = globalCatcher(async (req: any, res: any, next: any) => await ProductController.destroy(req, res, next))

router.get('/public/products', index)
router.get('/public/products/:id', find)
router.post('/products', create)
router.put('/products/:id', update)
router.delete('/products/:id', destroy)

export default router
