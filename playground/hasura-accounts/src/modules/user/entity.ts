import { get, set } from 'lodash';
import {
    AfterLoad, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

import { authRoles, defaultAuthRoles } from '@/hasura-accounts/modules/auth/server';
import * as T from '@/hasura-accounts/types';
import { UserEmail } from './entity.email';
import { UserProfile } from './entity.profile';
import { UserService } from './entity.service';
import { UserSession } from './entity.session';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  username!: string;

  @Column({ type: 'enum', enum: authRoles, default: defaultAuthRoles, array: true })
  roles!: T.Auth.Role[];

  @OneToMany(
    () => UserService,
    (userService) => userService.user,
    { eager: true }
  )
  allServices!: UserService[];

  @OneToMany(
    () => UserEmail,
    (userEmail) => userEmail.user,
    { eager: true }
  )
  emails!: UserEmail[];

  @OneToMany(
    () => UserSession,
    (userSession) => userSession.user,
    { eager: true }
  )
  sessions!: UserSession[];

  @OneToOne(() => UserProfile, { cascade: true, eager: true })
  @JoinColumn()
  profile!: UserProfile;

  @Column({ default: false })
  deactivated!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  services: any = {};

  @AfterLoad()
  async getServices() {
    this.services = await (this.allServices || []).reduce((acc, service) => {
      set(acc, service.name, [
        ...[].concat(get(acc, service.name, [])),
        { ...(service.token ? { token: service.token } : {}), ...service.options },
      ]);
      return acc;
    }, this.services);
  }
}
