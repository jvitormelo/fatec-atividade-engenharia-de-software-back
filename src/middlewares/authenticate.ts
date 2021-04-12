export const authenticateMiddleware = (req: any, res: any, next: any) => {
  if (req.path.includes('public')) { return next() }

  return next()
}
