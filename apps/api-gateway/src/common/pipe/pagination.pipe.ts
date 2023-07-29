import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    const pagination = {
      skip: Number(value.page) || 1,
      limit: value.limit || 10,
    };
    return pagination;
  }
}
