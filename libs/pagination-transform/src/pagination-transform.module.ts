import { Module } from '@nestjs/common';
import { PaginationTransformService } from './pagination-transform.service';

@Module({
  providers: [PaginationTransformService],
  exports: [PaginationTransformService],
})
export class PaginationTransformModule {}
