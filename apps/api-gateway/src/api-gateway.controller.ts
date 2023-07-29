import { Controller, Delete, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { QueryDto } from './dto/query.dto';
import { PaginationPipe } from './common/pipe/pagination.pipe';
import { Pagination } from './interfaces/pagination.interface';
import {
  ClientProxy,
  ClientProxyFactory,
  MessagePattern,
  Transport,
} from '@nestjs/microservices';
import { PaginationQuery } from './common/decorator/pagination-query.decorator';

@Controller()
export class ApiGatewayController {
  client: ClientProxy;
  constructor(
    // @Inject('USER_SERVICE') private client: ClientProxy,
    @Inject('TOKEN') private token: any,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { port: 3001 },
    });
  }

  // @Get()
  // async get() {
  //   const pattern = 'users';
  //   const data = [1, 2, 3, 4, 5];
  //   return this.client.send<number>(pattern, {
  //     dateRange: '124',
  //     page: '1',
  //     limit: '1',
  //   });
  // }

  @Get()
  get(
    @Query() originQuery: QueryDto,
    @PaginationQuery(new PaginationPipe()) paginationQuery: Pagination,
    @Req() req: Request,
  ) {
    // console.log('originQuery', originQuery);
    // console.log('paginationQuery', paginationQuery);
  }

  // @Get(':id')
  // getHelloById() {
  //   // throw new BadRequestException('Error :(((');
  //   // throw new Error('STATUS_CODE=404 | Cannot found user');
  //   throw new RpcException('Invalid credentials.');
  // }
}
