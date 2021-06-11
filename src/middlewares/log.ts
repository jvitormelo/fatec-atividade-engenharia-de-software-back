import globalCatcher from '../utils/globalCatcher'
import { NextFunction, Request, Response } from 'express'
import { Details } from 'express-useragent'

interface ILogRequest extends Request{
  useragent : Details
}

export const logMiddleware = globalCatcher(async (req: ILogRequest, res : Response, next: NextFunction) => {
  const payload = {
    user: req?.user || {},
    headers: req.headers,
    body: req.body,
    method: req.method,
    params: req.params,
    browser: req.useragent.browser,
    os: req.useragent.os,
    platform: req.useragent.platform,
    source: req.useragent.source
  }
  console.log(payload)
  next()
})
