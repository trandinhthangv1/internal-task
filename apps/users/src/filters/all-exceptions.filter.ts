import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AllExceptionFilter implements RpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    if (exception instanceof RpcException) {
      return throwError(() => ({
        isFromMicroservice: true,
        statusCode: 500,
        message: exception.getError(),
      }));
    } else if (exception instanceof HttpException) {
      const response = exception.getResponse();
      console.log(exception);
      return throwError(() => ({
        isFromMicroservice: true,
        statusCode: exception.getStatus(),
        message:
          typeof response === 'string' ? response : (response as any).message,
      }));
    } else if (exception instanceof Error) {
      let responseBody: any;
      if (exception.message.includes('STATUS_CODE=')) {
        const messageError = exception.message.replace('STATUS_CODE=', '');
        const [statusCode, actualMessage] = messageError.split('|');
        responseBody = {
          isFromMicroservice: true,
          statusCode: Number(statusCode),
          message: actualMessage.trim(),
        };
      } else {
        responseBody = {
          isFromMicroservice: true,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: exception.message,
        };
      }
      return throwError(() => responseBody);
    } else {
      throwError(() => ({
        isFromMicroservice: true,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
      }));
    }
  }
}
