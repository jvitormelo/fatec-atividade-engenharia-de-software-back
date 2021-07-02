import { IUser } from '../app'
import { Request, Response, NextFunction } from 'express'
import Token from '../services/Token'
import globalCatcher from '../utils/globalCatcher'
import { ErrorHandler } from '../services/errorAPI'
export const authenticateMiddleware = globalCatcher(async (req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes('public')) { return next() }

  const [, token] = req.headers.authorization?.split(' ') || []

  const tokenResponse = await Token.verify(token || '')
  if (!tokenResponse) throw new ErrorHandler(401, 'token invalido ou expirado')

  req.user = <IUser>tokenResponse

  return next()
})

export const authenticateAdmin = globalCatcher(async (req: Request, res: Response, next:NextFunction) => {
  if (req.user.type !== 'admin') throw new ErrorHandler(403, 'Acesso restrito')
  return next()
})

export const notAllowAdmin = globalCatcher(async (req: Request, res: Response, next:NextFunction) => {
  if (req.user.type === 'admin') throw new ErrorHandler(403, 'Administradores não podem realizar essa ação')
  return next()
})
