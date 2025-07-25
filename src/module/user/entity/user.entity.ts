import { UniqueIdEntity } from 'src/common/abstract/unique.entity';
import { EntityName } from 'src/common/enum/entity.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { UserRole } from '../enum/role.enum';
import { UserState } from '../enum/state.enum';

@Entity(EntityName.User)
export class UserEntity extends UniqueIdEntity {
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ unique: true, nullable: true })
  email: string;
  @Column({ unique: true, nullable: true })
  phone: string;
  @Column({ default: true })
  state: UserState;
  @Column({ name: 'is_mobile_verified', default: false })
  isMobileVerified: boolean;
  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;
  @Column()
  role: UserRole;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: ['insert'],
  })
  profile: ProfileEntity;
}
