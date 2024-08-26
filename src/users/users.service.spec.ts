import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserModel = {
    id: 7,
    email: 'michael.lawson@reqres.in',
    first_name: 'Michael',
    last_name: 'Lawson',
    avatar: 'https://reqres.in/img/faces/7-image.jpg',
  };

  const mockService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      jest.spyOn(service, 'findAll');
      mockService.findAll.mockResolvedValue([mockUserModel]);

      const result = await service.findAll();

      expect(result).toEqual([mockUserModel]);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      jest.spyOn(service, 'create');
      mockService.create.mockResolvedValue(mockUserModel);

      const result = await service.create(
        mockUserModel as unknown as CreateUserDto,
      );

      expect(result).toEqual(mockUserModel);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
