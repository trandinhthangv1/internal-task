import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import helmet from 'helmet';

import { ApiGatewayModule } from './api-gateway.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.use(cors());
  app.use(helmet());
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  await app.listen(3000);
}
bootstrap();
