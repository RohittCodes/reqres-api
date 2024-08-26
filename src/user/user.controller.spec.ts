import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/schemas/users.schema';
import { ConfigService } from '@nestjs/config';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserModel = {
    id: '7',
    email: 'michael.lawson@reqres.in',
    first_name: 'Michael',
    last_name: 'Lawson',
    avatar: 'https://reqres.in/img/faces/7-image.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn(), // Mock the findById function
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(), // Mock the get function of ConfigService
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  describe('findOne', () => {
    it('should return the user with the given id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUserModel);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockUserModel);
    });

    it('should return null if the user is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const result = await controller.findOne('1');

      expect(result).toBeNull();
    });
  });

  // TODO: Fix getAvatar test
  describe('getAvatar', () => {
    it('should return the avatar of the user with the given id', async () => {
      jest.spyOn(service, 'getAvatar').mockResolvedValue(mockUserModel.avatar);

      const result = await controller.getAvatar('1');

      expect(result).toEqual(mockUserModel.avatar);
    });
  });

  // TODO: Fix deleteAvatar test
  describe('deleteAvatar', () => {
    it('should delete the avatar of the user with the given id', async () => {
      jest.spyOn(service, 'deleteAvatar').mockResolvedValue(null);

      const result = await controller.deleteAvatar('1');

      expect(result).toBe(true);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
