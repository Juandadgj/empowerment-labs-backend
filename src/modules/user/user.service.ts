import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, InjectModel } from 'nestjs-dynamoose';
import { User, UserKey } from '../../shared/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User, UserKey>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userModel.create(createUserDto);
      return {
        status: true,
        msg: '',
        data: newUser,
      }
    } catch (error) {
      return {
        status: false,
        msg: '',
        data: error.message
      }
    }
  }

  findOne(id: number) {
    try {
      const user = this.userModel.get({userId: id});
      return {
        status: true,
        msg: '',
        data: user,
      }
    } catch (error) {
      return {
        status: false,
        msg: '',
        data: error.message
      }
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
