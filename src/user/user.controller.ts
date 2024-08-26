import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.userService.findOne(+id);
  }

  @Get(':userId/avatar')
  getAvatar(@Param('userId') id: string) {
    return this.userService.getAvatar(+id);
  }

  @Delete(':userId/avatar')
  deleteAvatar(@Param('userId') id: string) {
    return this.userService.deleteAvatar(+id);
  }
}
