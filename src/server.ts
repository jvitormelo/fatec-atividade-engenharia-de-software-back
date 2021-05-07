import app from './app'
import http from 'http'

const server = http.createServer(app)
server.listen(process.env.PORT || 3000, async () => {
  try {

  } catch (e) {
    console.log('Error while starting the server')
    console.log(e)
  }
})
