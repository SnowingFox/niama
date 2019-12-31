import { get, set } from 'lodash';
import {
    AfterLoad, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

import { UserEmail } from './b.user.email.entity';
import { UserProfile } from './b.user.profile.entity';
import { UserService } from './b.user.service.entity';
import { UserSession } from './b.user.session.entity';

export type UserRole = 'ADMIN' | 'MEMBER';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ nullable: true })
  public username!: string;

  @Column({ type: 'enum', enum: ['ADMIN', 'MEMBER'], default: ['MEMBER'], array: true })
  public roles!: UserRole[];

  @OneToMany(
    () => UserService,
    (userService) => userService.user,
    { eager: true }
  )
  public allServices!: UserService[];

  @OneToMany(
    () => UserEmail,
    (userEmail) => userEmail.user,
    { eager: true }
  )
  public emails!: UserEmail[];

  @OneToMany(
    () => UserSession,
    (userSession) => userSession.user,
    { eager: true }
  )
  public sessions!: UserSession[];

  @OneToOne(() => UserProfile, { cascade: true, eager: true })
  @JoinColumn()
  profile!: UserProfile;

  @Column({ default: false })
  public deactivated!: boolean;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  public services: any = {};

  @AfterLoad()
  public async getServices() {
    this.services = (this.allServices || []).reduce((acc, service) => {
      set(acc, service.name, [
        ...[].concat(get(acc, service.name, [])),
        { ...(service.token ? { token: service.token } : {}), ...service.options },
      ]);
      return acc;
    }, this.services);
  }
}
