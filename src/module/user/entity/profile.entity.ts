import { IncrementalId } from 'src/common/abstract/base.entity';
import { EntityName } from 'src/common/enum/entity.enum';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity(EntityName.Profile)
export class ProfileEntity extends IncrementalId {
  @Column({ name: 'nick_name', nullable: true })
  nickName: string;

  @Column({ name: 'profile_image', nullable: true })
  profile_image: string;

  @Column({ nullable: true })
  bio: string;

  @OneToOne(() => UserEntity, (user) => user.profile, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
