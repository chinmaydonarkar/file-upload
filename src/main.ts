import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Add this in a bootstrap script or manually run once
import * as bcrypt from 'bcrypt';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
