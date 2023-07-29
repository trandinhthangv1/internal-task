import { Controller, Delete, Get, Inject, Query } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { QueryDto } from './dto/query.dto';
import { PaginationPipe } from './common/pipe/pagination.pipe';
import { Pagination } from './interfaces/pagination.interface';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Get()
  async get() {
    const pattern = 'users';
    const data = [1, 2, 3, 4, 5];
    return this.client.send<number>(pattern, {
      dateRange: '124',
      page: '1',
      limit: '1',
    });
  }

  // @Get()
  // get(
  //   @Query() originQuery: QueryDto,
  //   @Query(new PaginationPipe()) paginationQuery: Pagination,
  // ) {
  //   console.log('originQuery', originQuery);
  //   console.log('paginationQuery', paginationQuery);
  // }

  // @Get(':id')
  // getHelloById() {
  //   // throw new BadRequestException('Error :(((');
  //   // throw new Error('STATUS_CODE=404 | Cannot found user');
  //   throw new RpcException('Invalid credentials.');
  // }
}
