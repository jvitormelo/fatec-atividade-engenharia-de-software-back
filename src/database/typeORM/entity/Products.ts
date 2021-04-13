import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string;

    @Column({})
    category!: string;

    @Column()
    description!: string;

    @Column({ type: 'float' })
    price!: number;

    @Column({ default: Date.now() })
    createdAt!: string
}
