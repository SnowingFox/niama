import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from './entity';

@Entity()
export class UserEmail {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => User,
    (user) => user.emails,
    { onDelete: 'CASCADE' }
  )
  user!: User;

  @Unique(['address'])
  @Column()
  address!: string;

  @Column({ default: false })
  verified!: boolean;

  @Column({ nullable: true })
  userId!: string;
}
