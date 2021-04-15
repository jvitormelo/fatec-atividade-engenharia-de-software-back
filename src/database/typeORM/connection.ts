import { createConnection } from 'typeorm'
import { Users } from './entity/Users'
import { Products } from './entity/Products'

export const databaseConnection = async () => {
  return createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: [
      Users,
      Products
    ],
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    synchronize: true,
    logging: false
  })
}
