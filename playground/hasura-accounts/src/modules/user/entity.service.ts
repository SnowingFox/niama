import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './entity';

@Entity()
export class UserService {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => User,
    user => user.services,
    { onDelete: 'CASCADE' }
  )
  user!: User;

  @Column()
  name!: string;

  @Column({ nullable: true })
  token?: string;

  @Column('jsonb', { nullable: true })
  options: { bcrypt: string } | any;

  @Column({ nullable: true })
  serviceId!: string;

  @Column({ nullable: true })
  userId!: string;
}