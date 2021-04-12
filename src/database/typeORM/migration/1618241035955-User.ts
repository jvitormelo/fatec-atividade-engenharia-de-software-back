import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class User1618241035955 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'string'
        },
        {
          name: 'password',
          type: 'string'
        },
        {
          name: 'email',
          type: 'string',
          isUnique: true
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
