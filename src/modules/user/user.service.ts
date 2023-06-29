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
      const newUser = await this.userModel.create(createUserDto);
      return {
        status: true,
        msg: 'User successfully created',
        data: newUser,
      }
    } catch (error) {
      return {
        status: false,
        msg: error.message,
        data: null,
      }
    }
  }

  findOne(id: string) {
    try {
      const user = this.userModel.get({userId: id});
      return {
        status: true,
        msg: 'Query completed successfully',
        data: user,
      }
    } catch (error) {
      return {
        status: false,
        msg: error.message,
        data: null
      }
    }
  }

  async userExists(userId: string) {
    try {
      const movie = await this.userModel.get({userId});
      return Boolean(movie);
    } catch (error) {
      return false;
    }
  }
}
