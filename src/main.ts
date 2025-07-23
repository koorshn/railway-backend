import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerConfig } from './config/swagger.config';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  SwaggerConfig(app);
  const { PORT } = process.env;

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useStaticAssets('public');
  await app.listen(PORT, () => {
    console.log(`application start http://localhost:${PORT}`);
    console.log(`swagger Document start http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
