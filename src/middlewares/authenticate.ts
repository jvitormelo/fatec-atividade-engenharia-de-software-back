import { IUser } from '../app'
import { Request, Response, NextFunction } from 'express'
import Token from '../services/Token'
import globalCatcher from '../utils/globalCatcher'
import { ErrorHandler } from '../services/errorAPI'
export const authenticateMiddleware = globalCatcher(async (req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes('public')) { return next() }
  const token = req.headers.authorization
  const tokenResponse = await Token.verify(token || '')
  if (!tokenResponse) throw new ErrorHandler(401, 'token invalido ou expirado')

  req.user = <IUser>tokenResponse

  return next()
})
