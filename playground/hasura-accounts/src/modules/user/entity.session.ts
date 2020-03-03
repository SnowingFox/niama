import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './entity';

@Entity()
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => User,
    (user) => user.sessions,
    { onDelete: 'CASCADE' }
  )
  user!: User;

  @Column()
  token!: string;

  @Column()
  valid!: boolean;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ nullable: true })
  ip?: string;

  @Column('jsonb', { nullable: true })
  extra?: object;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @Column({ nullable: true })
  userId!: string;
}
