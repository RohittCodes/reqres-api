import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserModel = {
    "id": 7,
    "email": "michael.lawson@reqres.in",
    "first_name": "Michael",
    "last_name": "Lawson",
    "avatar": "https://reqres.in/img/faces/7-image.jpg"
  };

  const mockService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: mockService,
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  describe('findAll', () => {

    it('should return all users', async () => {
      jest.spyOn(service, 'findAll');
      mockService.findAll.mockResolvedValue([mockUserModel]);

      const result = await controller.findAll();

      expect(result).toEqual([mockUserModel]);
    })
  });

  describe('create', () => {

    it('should create a new user', async () => {
      jest.spyOn(service, 'create');
      mockService.create.mockResolvedValue(mockUserModel);

      const result = await controller.create(mockUserModel as unknown as CreateUserDto);

      expect(result).toEqual(mockUserModel);
    })
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
