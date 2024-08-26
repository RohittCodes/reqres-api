import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AvatarSchema } from './schemas/avatar.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Avatar', schema: AvatarSchema }]), ConfigModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
