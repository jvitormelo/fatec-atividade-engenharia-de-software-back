import { createConnection } from 'typeorm'
import { User } from './entity'

export const databaseConnection = async () => {
  return process.env.MODE === 'DEV'
    ? createConnection({
        type: 'postgres',
        host: process.env.LOCAL_DATABASE_HOST,
        port: 5432,
        username: process.env.LOCAL_DATABASE_USERNAME,
        password: process.env.LOCAL_DATABASE_PASSWORD,
        database: process.env.LOCAL_DATABASE,
        entities: [
          User
        ],
        synchronize: true,
        logging: false
      })
    : createConnection({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [
        User
      ],
      synchronize: true,
      logging: false
    })
}
