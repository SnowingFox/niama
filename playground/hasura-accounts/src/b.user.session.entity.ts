import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './b.user.entity';

@Entity()
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ManyToOne(
    () => User,
    (user) => user.sessions,
    { onDelete: 'CASCADE' }
  )
  public user!: User;

  @Column()
  public token!: string;

  @Column()
  public valid!: boolean;

  @Column({ nullable: true })
  public userAgent?: string;

  @Column({ nullable: true })
  public ip?: string;

  @Column('jsonb', { nullable: true })
  public extra?: object;

  @CreateDateColumn()
  public createdAt!: string;

  @UpdateDateColumn()
  public updatedAt!: string;

  @Column({ nullable: true })
  public userId!: string;
}
