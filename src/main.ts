import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API con vulnerabilidades de seguridad')
    .setDescription('Documentación de la API para pruebas')
    .setVersion('1.0.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
