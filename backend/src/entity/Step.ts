import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('json')
  questions: any;
}
