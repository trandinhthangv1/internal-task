import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MaintenanceNotiModule } from './maintenance-noti/maintenance-noti.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    UsersModule,
    MaintenanceNotiModule,
    HealthModule,
    // ClientsModule.register([
    //   {
    //     name: 'USER_SERVICE',
    //     transport: Transport.TCP,
    //     options: { port: 3001 },
    //   },
    // ]),
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
    {
      provide: 'TOKEN',
      // useClass: class A {
      //   get() {
      //     return 'hihi';
      //   }
      // },
      useFactory: () => {
        return {
          message: 123,
        };
      },
    },
  ],
})
export class ApiGatewayModule implements NestModule {
  onModuleInit() {
    console.log(`ApiGatewayModule được khởi tạo`);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
