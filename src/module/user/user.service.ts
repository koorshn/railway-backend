import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entity/profile.entity';
import { userValidation } from './util/username.util';
import {
  UserConflictMessage,
  UserNotAcceptMessage,
} from './enum/user-error.msg';
import { hashPassword } from './util/password.util';
import { UserRole } from './enum/role.enum';
import { RegisterUser } from './types/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const { username, password, role, nickName } = createUserDto;
    if (!userValidation(username))
      throw new NotAcceptableException(UserNotAcceptMessage.invalidUsername);

    const hashedPassword = hashPassword(password);

    if (role === UserRole.SuperAdmin)
      throw new NotAcceptableException(UserNotAcceptMessage.roleNotAccept);

    const tempUser = {
      username,
      password: hashedPassword,
      role,
      nickName,
    };
    const existUser = await this.findUserByUsername(username);
    if (existUser)
      throw new ConflictException(UserConflictMessage.duplicateUsername);

    const user = await this.registerUser(tempUser);

    return { success: 'success', data: user };
  }

  async findUserByUsername(username: string) {
    return this.userRepository.findOneBy({
      username,
    });
  }
  private async registerUser(userData: RegisterUser) {
    const { username, password, role, nickName } = userData;
    const tempUser = this.userRepository.create({
      username,
      role,
      password,
      profile: {
        nickName,
      },
    });
    return this.userRepository.save(tempUser);
  }
}
