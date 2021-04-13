import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Products1618269010246 implements MigrationInterface {
    name = 'Products1618269010246'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'category',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'price',
            type: 'float'
          },
          {
            name: 'createdAt',
            type: 'varchar',
            default: Date.now()
          }
        ]
      }))
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('products')
    }
}
