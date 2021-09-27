import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    public userModel: Model<UserDocument>,
  ) {}

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async create(@Res() res, createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const createdUser = new this.userModel(createUserDto);
    await this.userModel.findOneAndUpdate(
      { email: createUserDto.email, password: createUserDto.password },
      { email: createUserDto.email, password: hashedPassword },
      { new: true, upsert: true },
    );
    return createdUser.save();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async deleteUsers() {
    return await this.userModel.deleteMany();
  }
}
