import JWT from 'jsonwebtoken'
class Token {
  async create (payload: object) {
    // @ts-ignore
    return JWT.sign(payload, process.env.TOKEN_SECRET)
  }

  async verify (token:string) {
    // @ts-ignore
    return JWT.verify(token, process.env.TOKEN_SECRET)
  }
}
export default new Token()
