import { Users } from './src/database/typeORM/entity/Users'
import { Products } from './src/database/typeORM/entity/Products'

// 'src/database/typeORM/entity/**/*.ts', 'dist/src/database/typeORM/entity/**/*.js'
module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  logging: false,
  entities: [
    Users,
    Products
  ],
  migrations: [
    'src/database/typeORM/entity/**/*.ts', 'dist/src/database/typeORM/entity/**/*.js'
  ],
  subscribers: [
    'src/database/typeORM/entity/**/*.ts', 'dist/src/database/typeORM/entity/**/*.js'
  ],
  cli: {
    entitiesDir: 'src/database/typeORM/entity',
    migrationsDir: 'src/database/typeORM/migration',
    subscribersDir: 'src/database/typeORM/subscriber'
  }
}
