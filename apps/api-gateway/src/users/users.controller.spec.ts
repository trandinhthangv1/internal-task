import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  describe('CatsController', () => {
    let controller: UsersController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [UsersService],
      }).compile();

      controller = module.get<UsersController>(UsersController);
    });

    describe('getCats', () => {
      it('should return filtered cats', () => {
        const result = controller.findOne({ id: 123 });
        expect(result).toEqual(123);
      });
    });
  });
});
