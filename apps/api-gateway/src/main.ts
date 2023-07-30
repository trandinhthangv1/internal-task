import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

import { ApiGatewayModule } from './api-gateway.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, { rawBody: true });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  await app.startAllMicroservices();

  app.use(compression());
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  await app.listen(3000);
}
bootstrap();
