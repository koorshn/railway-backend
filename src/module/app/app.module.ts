import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { typeOrmConfig } from 'src/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: join(process.cwd(), '.env') }),
    TypeOrmModule.forRoot(typeOrmConfig()),
  ],
})
export class AppModule {}
