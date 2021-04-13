import { createConnection } from 'typeorm'

export const databaseConnection = async () => {
  return createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: [
      'src/database/typeORM/entity/**/*.ts', 'dist/src/database/typeORM/entity/**/*.js'
    ],
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    logging: false
  })
}
