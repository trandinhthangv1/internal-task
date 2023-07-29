import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../src/users.module';
import { INestMicroservice } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TcpOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { ClientProxyFactory } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

describe('AppController (E2E)', () => {
  let app: INestMicroservice;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    const microserviceOptions = {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    };
    app = moduleFixture.createNestMicroservice(microserviceOptions);
    await app.listen();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/hello (pattern)', async () => {
    const clientProxy = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    });

    const result = await firstValueFrom(
      clientProxy.send<string>('users', {
        page: '1',
        dateRange: '123',
        limit: '1',
      }),
    );

    expect(result).toBe('abc');
  });
});
