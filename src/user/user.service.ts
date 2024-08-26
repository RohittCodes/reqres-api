import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avatar } from './schemas/avatar.schema';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class UserService {

  private readonly reqresApiUrl: string;
  private readonly avatarsFolder = path.join(__dirname, '..', 'avatars');

  @InjectModel(Avatar.name) private avatarModel: Model<Avatar>;
  
  constructor(private configService: ConfigService) {
      this.reqresApiUrl = this.configService.get<string>('REQRES_API_URL');
      if (!fs.existsSync(this.avatarsFolder)) {
        fs.mkdirSync(this.avatarsFolder);
      }
  }

  async findOne(id: number) {
    const response = await axios.get(`${this.reqresApiUrl}/users/${id}`);
    return response.data.data;
  }

  async getAvatar(id: number) {
    const data = await this.findOne(id);

    // Create a hash of the avatar data
    const hash = crypto.createHash('sha256').update(data.avatar).digest('hex');

    const avatar = await this.avatarModel.findOne({ userId : id, hash });

    if (avatar) {
      const file = fs.readFileSync(avatar.filePath);
      return file.toString('base64');
    }

    const filePath = `./avatars/${id}_${hash}.png`;

    // Save the avatar to the file system and the database
    fs.writeFileSync(filePath, data.avatar);

    const newAvatar = new this.avatarModel({ userId: id, hash, filePath });

    await newAvatar.save();

    // Return the avatar as a base64 string
    const file = fs.readFileSync(filePath);
    return file.toString('base64');
  }

  async deleteAvatar(id: number) {
    const data = await this.findOne(id);

    // Create a hash of the avatar data
    const hash = crypto.createHash('sha256').update(data.avatar).digest('hex');

    const avatar = await this.avatarModel.findOne({ userId : id, hash });

    if (!avatar) {
      throw new NotFoundException();
    }

    // Delete the avatar from the file system
    fs.unlinkSync(avatar.filePath);

    await avatar.deleteOne();

    return { message: 'Avatar deleted' };
  }
}
