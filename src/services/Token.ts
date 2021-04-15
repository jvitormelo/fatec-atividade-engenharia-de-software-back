import JWT from 'jsonwebtoken'
class Token {
  async create (payload: object) {
    return JWT.sign(payload, process.env.TOKEN_SECRET || '')
  }

  async verify (token:string) {
    try {
      return JWT.verify(token, process.env.TOKEN_SECRET || '')
    } catch (e) {
      return null
    }
  }
}
export default new Token()
