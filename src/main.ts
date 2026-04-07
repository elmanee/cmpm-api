import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaService } from './prisma.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  app.useGlobalFilters(new AllExceptionFilter(prismaService));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API con vulnerabilidades de seguridad')
    .setDescription('Documentación de la API para pruebas')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api/docs', app, document);

  
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();