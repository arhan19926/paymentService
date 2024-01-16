import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  const config = new DocumentBuilder()
  .setTitle('zo-ma-to')
  .setDescription('Food delivery application')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT,'0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
