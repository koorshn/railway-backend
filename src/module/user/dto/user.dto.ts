import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UserDtoMessage } from '../enum/user-dto.msg';
import { UserRole } from '../enum/role.enum';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: '' })
  @IsString({ message: UserDtoMessage.stringUsername })
  username: string;

  @ApiProperty({ example: '' })
  @IsString({ message: UserDtoMessage.stringPassword })
  @MinLength(8, { message: UserDtoMessage.MinPassword })
  password: string;

  @ApiProperty({ enum: Object.keys(UserRole) })
  @Transform(({ value }) => UserRole[value])
  @IsEnum(UserRole)
  role: UserRole;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString({ message: UserDtoMessage.stringNickname })
  @Length(2, 20, { message: UserDtoMessage.LengthNickname })
  nickName: string;
}
