import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Deal {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    date: Date;

    @Column()
    cpf: string;

    @Column()
    value: number;

    @Column()
    cashback_percent: number;

    @Column()
    cashback_value: number;

    @Column()
    status: string;
}