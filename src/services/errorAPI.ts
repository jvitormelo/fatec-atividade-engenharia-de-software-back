export class ErrorHandler extends Error {
    private statusCode: number;
    constructor (statusCode : number, message: string) {
      super()
      this.statusCode = statusCode
      this.message = message
    }
}

export const handleError = (err:any, res:any) => {
  console.log('erro')

  const { statusCode, message } = err
  console.log(statusCode)
  res.status(statusCode || 500).json({
    message: message,
    statusCode: statusCode || 500,
    status: 'error'
  })
}
