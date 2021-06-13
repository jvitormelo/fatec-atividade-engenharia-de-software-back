import globalCatcher from '../utils/globalCatcher'
import { NextFunction, Request, Response } from 'express'
import { Details } from 'express-useragent'
import { PrismaClient } from '@prisma/client'
import users from '../views/persons/users'

const prisma = new PrismaClient()

interface ILogRequest extends Request{
  useragent : Details
}

export const logMiddleware = globalCatcher(async (req: ILogRequest, res : Response, next: NextFunction) => {
  const body = { ...req.body }
  if (body.password) {
    delete body.password
  }

  const payload = {
    path: req.path,
    headers: req.headers,
    body,
    method: req.method,
    params: req.params,
    browser: req.useragent.browser,
    os: req.useragent.os,
    platform: req.useragent.platform,
    source: req.useragent.source
  }
  await prisma.logs.create({
    data: {
      body: payload,
      userId: req?.user?.id || 0
    }
  })

  next()
})
