import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { Model, InjectModel } from 'nestjs-dynamoose';
import { User, UserKey } from '../../shared/interfaces/user.interface';
import { AuthLoginUserDto } from './dto/login-user.dto';
import { AuthRegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  private userPool: CognitoUserPool;

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User, UserKey>,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    });
  }

  async registerUser(authRegisterUserDto: AuthRegisterUserDto) {
    try {
      const { name, email, password } = authRegisterUserDto;
      const userCognito = await new Promise((resolve, reject) => {
        this.userPool.signUp(
          email,
          password,
          [
            new CognitoUserAttribute({
              Name: 'name',
              Value: name,
            }),
          ],
          null,
          (err, result) => {
            if (!result) {
              reject(err);
            } else {
              resolve(result.user);
            }
          },
        );
      });
      const newUser = await this.userModel.create({
        name: authRegisterUserDto.name,
        email: authRegisterUserDto.email,
      });
      return {
        status: true,
        msg: 'User successfully registered',
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

  async authenticateUser(authLoginUserDto: AuthLoginUserDto) {
    try {
      const { email, password } = authLoginUserDto;
      const userData = {
        Username: email,
        Pool: this.userPool,
      };

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const userCognito = new CognitoUser(userData);

      const authorization = await new Promise((resolve, reject) => {
        userCognito.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
          resolve({
              accessToken: result.getAccessToken().getJwtToken(),
              refreshToken: result.getRefreshToken().getToken(),
            });
          },
          onFailure: (err) => {
            reject(err);
          },
        });
      });
      return {
        status: true,
        msg: 'Successful authentication',
        data: authorization
      }
    } catch (error) {
      return {
        status: false,
        msg: error.message,
        data: null,
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
