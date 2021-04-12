module.exports = {
  type: 'postgres',
  host: process.env.LOCAL_DATABASE_HOST,
  port: 5432,
  username: process.env.LOCAL_DATABASE_USERNAME,
  password: process.env.LOCAL_DATABASE_PASSWORD,
  database: process.env.LOCAL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    'src/database/typeORM/entity/**/*.ts'
  ],
  migrations: [
    'src/database/typeORM/migration/**/*.ts'
  ],
  subscribers: [
    'src/database/typeORM/subscriber/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/database/typeORM/entity',
    migrationsDir: 'src/database/typeORM/migration',
    subscribersDir: 'src/database/typeORM/subscriber'
  }
}
