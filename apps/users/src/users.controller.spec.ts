import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];

      expect(
        usersController.get(
          {
            dateRange: '123',
            limit: '1',
            page: '2',
          },
          {},
        ),
      ).toBe(result);
    });
  });
});
