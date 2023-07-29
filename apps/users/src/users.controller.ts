import { Controller, HttpException, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationPipe } from './pipe/pagination.pipe';

export class QueryDto {
  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  limit: string;

  @IsNotEmpty()
  dateRange: string;
}

export interface Pagination {
  skip: number;
  limit: number;
}

@Controller()
export class UsersController {
  @MessagePattern('users')
  get(
    @Payload() queryDto: QueryDto,
    @Payload(new PaginationPipe()) pagination: Pagination,
  ) {
    console.log('queryDto', queryDto);
    console.log('pagination', pagination);
    // throw new Error('STATUS_CODE=400 | Not found user');
    throw new NotFoundException('hihi123');
    return 'abc';
  }
}
