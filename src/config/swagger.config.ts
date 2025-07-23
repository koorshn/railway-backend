import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pkg from '../../package.json';

export function SwaggerConfig(app: INestApplication) {
  const document = new DocumentBuilder()
    .setTitle('railway-applicatin')
    .setDescription('backend api server for railway blog')
    .setVersion(`${pkg.version}`)
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('swagger', app, swaggerDocument);
}
