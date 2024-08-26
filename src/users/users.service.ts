import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy, EventPattern } from '@nestjs/microservices';

import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: mongoose.Model<User>,
        @Inject('USER_SERVICE') private rabbitClient: ClientProxy,
    ) {}

    findAll() {
        return 'This action returns all users';
    }

    async create(user: User) {
        // Store the user entry in the database
        const newUser = new this.userModel(user);
        await newUser.save();
    
        // Send the email event using RabbitMQ
        this.rabbitClient.emit('user_created', newUser).subscribe(() => {
            console.log('User created event sent');
        });
    
        return newUser;
    }    

    // consume the event from the RabbitMQ
    @EventPattern('user_created')
    async handleUserCreated(data: any) {
        console.log('User created', data);
    }
}
