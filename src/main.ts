import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { addSwagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  addSwagger(app);
  
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.NEST_PORT).then(() => {
    console.log(`Running on port ${process.env.NEST_PORT}`);
  });
}
bootstrap();
