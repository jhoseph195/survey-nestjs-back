import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const addSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Survey')
    .setDescription('Documentación de uso del API')
    .setVersion('0.0.1')
    .addBearerAuth(
      { 
        type: 'http',
        scheme: 'bearer',
        in: 'header' 
      },
      'access-token',
      )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
};
