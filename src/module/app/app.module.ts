import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: join(process.cwd(), '.env') }),
    TypeOrmModule.forRoot(typeOrmConfig()),
    UserModule,
  ],
})
export class AppModule {}
