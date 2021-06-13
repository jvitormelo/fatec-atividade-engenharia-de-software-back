export class ErrorHandler extends Error {
    private statusCode: number;
    constructor (statusCode : number, message: string) {
      super()
      this.statusCode = statusCode
      this.message = message
    }
}

export const handleError = (err:any, res:any) => {
  const { statusCode, code, message } = err
  console.log('erros', err)
  res.status(statusCode || 500).json({
    code,
    message: message,
    statusCode: statusCode || 500,
    status: 'error'
  })
}
