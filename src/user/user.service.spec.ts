import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/schemas/users.schema';
import { Model } from 'mongoose';

describe('UserService', () => {
  let service: UserService;
  let model: any;

  const mockUserModel = {
    id: 7,
    email: 'michael.lawson@reqres.in',
    first_name: 'Michael',
    last_name: 'Lawson',
    avatar: 'https://reqres.in/img/faces/7-image.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('findOne', () => {
    it('should return the user with the given id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockUserModel);

      const result = await service.findOne(1);

      expect(result).toEqual(mockUserModel);
    });

    it('should return null if the user is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(result).toBeNull();
    });
  });

  // TODO: Fix getAvatar test
  describe('getAvatar', () => {
    it('should return the avatar of the user with the given id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockUserModel);

      const result = await service.getAvatar(1);

      expect(result).toEqual(mockUserModel.avatar);
    });

    it('should return null if the user is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      const result = await service.getAvatar(1);

      expect(result).toBeNull();
    });
  });

  // TODO: Fix deleteAvatar test
  describe('deleteAvatar', () => {
    it('should delete the avatar of the user with the given id', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockUserModel);

      await service.deleteAvatar(1);

      expect(mockUserModel.avatar).toBeNull();
    });

    it('should return null if the user is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      const result = await service.deleteAvatar(1);

      expect(result).toBeNull();
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
