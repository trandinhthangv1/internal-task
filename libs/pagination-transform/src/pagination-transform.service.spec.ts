import { Test, TestingModule } from '@nestjs/testing';
import { PaginationTransformService } from './pagination-transform.service';

describe('PaginationTransformService', () => {
  let service: PaginationTransformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationTransformService],
    }).compile();

    service = module.get<PaginationTransformService>(
      PaginationTransformService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
