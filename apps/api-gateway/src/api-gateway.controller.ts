import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Req,
  Res,
  Sse,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
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
import { Response } from 'express';
import { Cookies } from './common/decorator/cookies.decorator';
import { data } from './data';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import * as fs from 'fs/promises';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';
import {} from 'stream';
import { Observable, Subject, interval, map } from 'rxjs';

let sessionID = 1;

const visits = {};

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

  private sseSubject = new Subject<any>();

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.sseSubject.asObservable();
  }

  @Get()
  notification() {
    return this.sseSubject.next('data');
  }

  // @Get()
  // async get(@Req() req, @Res({ passthrough: true }) res) {
  //   if (visits[req.cookies.sessionID]) {
  //     visits[req.cookies.sessionID] = visits[req.cookies.sessionID] + 1;
  //     console.log('visit', visits[req.cookies.sessionID]);
  //   } else {
  //     visits[sessionID] = 1;
  //     res.cookie('sessionID', sessionID);
  //   }

  //   sessionID++;
  // }

  // @Get()
  // async get(@Res() res) {
  //   // const file = createReadStream(
  //   //   join(process.cwd(), '/apps/api-gateway/src/data.ts'),
  //   // );
  //   // file.pipe(res);

  //   const stream = Readable.from(JSON.stringify(data));
  //   stream.on('data', (chunk) => console.log('---'));
  //   stream.pipe(res);
  // }

  // @Post('file')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@Req() req) {
  //   console.log(req.file);
  // }

  // @Post('files')
  // @UseInterceptors(FilesInterceptor('files'))
  // uploadFiles(@Req() req) {
  //   console.log(req.files);
  // }

  // @Post('file-fields')
  // // @UseInterceptors(
  // //   FileFieldsInterceptor([{ name: 'files' }, { name: 'avatar' }]),
  // // )
  // uploadMultiFields(@Req() req) {
  //   // console.log(req.files);'
  //   const data = [];
  //   req.on('data', (chunk) => data.push(chunk));

  //   req.on('end', () => {
  //     const newData = Buffer.concat(data);
  //     console.log(newData.toString());
  //   });

  //   // console.log(req.files.avatar[0].buffer.toString());
  //   // fs.writeFile(
  //   //   `./${req.files.avatar[0].originalname}`,
  //   //   req.files.avatar[0].buffer,
  //   // );
  // }
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

  // @Get()
  // get(
  //   @Query() originQuery: QueryDto,
  //   @PaginationQuery(new PaginationPipe()) paginationQuery: Pagination,
  //   @Cookies() cookies,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   console.log(cookies);

  //   // console.log('originQuery', originQuery);
  //   // console.log('paginationQuery', paginationQuery);
  // }

  // @Get(':id')
  // getHelloById() {
  //   return JSON.stringify(data);
  //   // throw new BadRequestException('Error :(((');
  //   // throw new Error('STATUS_CODE=404 | Cannot found user');
  //   // throw new RpcException('Invalid credentials.');
  // }

  @Post()
  create(@Req() req) {
    console.log(req.rawBody);
    console.log(req.body);
  }
}
