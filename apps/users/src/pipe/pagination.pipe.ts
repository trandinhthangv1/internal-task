import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const pagination = {
      skip: Number(value.page) || 1,
      limit: Number(value.limit) || 10,
    };
    return pagination;
  }
}
