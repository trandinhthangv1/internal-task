import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let responseBody: Record<string, any> = {};

    if (exception instanceof HttpException) {
      const response = exception.getResponse(); // HttpException: response is string, OtherExceptions: response is { message, error, statusCode }
      responseBody = {
        statusCode: exception.getStatus(),
        message:
          typeof response === 'string' ? response : (response as any).message,
      };
    } else if (exception instanceof Error) {
      if (exception.message.includes('STATUS_CODE=')) {
        const messageError = exception.message.replace('STATUS_CODE=', '');
        const [statusCode, actualMessage] = messageError.split('|');
        responseBody = {
          statusCode: Number(statusCode),
          message: actualMessage.trim(),
        };
      } else {
        responseBody = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: exception.message,
        };
      }
    } else if ((exception as any).isFromMicroservice) {
      responseBody = {
        statusCode: (exception as any).statusCode,
        message: (exception as any).message,
      };
    } else {
      responseBody = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: (exception as any).message,
      };
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
