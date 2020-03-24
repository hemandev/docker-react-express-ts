import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Value {
    @PrimaryGeneratedColumn()
    readonly id: number | undefined;

    @Column('int')
    index: number | undefined;
}
