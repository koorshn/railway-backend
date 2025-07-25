import { IncrementalId } from 'src/common/abstract/base.entity';
import { EntityName } from 'src/common/enum/entity.enum';
import { Column, Entity } from 'typeorm';

@Entity(EntityName.Otp)
export class OtpEntity extends IncrementalId {
  @Column()
  code: string;
  @Column({ name: 'expires_in' })
  expiresIn: Date;
}
