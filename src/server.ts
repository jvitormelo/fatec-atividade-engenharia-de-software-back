import app from './app'
import http from 'http'
import { databaseConnection } from './database/typeORM/connection'
// const mongoose = require('mongoose')

const server = http.createServer(app)
server.listen(process.env.PORT || 3000, async () => {
  try {
    await databaseConnection()

    // await mongoose.connect(process.env, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Server online')
  } catch (e) {
    console.log('Error while starting the server')
    console.log(e)
  }
})
