import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Swagger
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Backend')
        .setDescription('The API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT ?? 8000);
    console.log(`App is listening on http://localhost:8000/`);
    console.log(`App Swegger is on http://localhost:8000/docs`);
}
bootstrap();
