import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 50 })
    name!: string;

    @Column()
    password!: string;

    @Column({ unique: true })
    email!: string;
}
