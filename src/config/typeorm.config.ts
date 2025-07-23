import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function typeOrmConfig(): TypeOrmModuleOptions {
  const { DB_NAME, DB_PORT, DB_URL, DB_USER, DB_PASS } = process.env;

  return {
    type: 'postgres',
    host: DB_URL,
    port: +DB_PORT,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    entities: [
      'dist/**/**/*.entity{.ts,.js}',
      'dist/**/**/**/*.entity{.ts,.js}',
    ],
    autoLoadEntities: false,
    synchronize: true,
  };
}
