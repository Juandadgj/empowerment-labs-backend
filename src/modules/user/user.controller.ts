import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthRegisterUserDto, UserRegisteredDto } from './dto/register-user.dto';
import { AuthLoginUserDto, UserLoggedDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register user in the application' })
  @ApiBody({ type: AuthRegisterUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserRegisteredDto,
    description: 'User successfully registered',
  })
  @Post('/register')
  async register(@Body() authRegisterUserDto: AuthRegisterUserDto) {
    return await this.userService.registerUser(authRegisterUserDto);
  }

  @ApiOperation({ summary: 'User authentication' })
  @ApiBody({ type: AuthLoginUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserLoggedDto,
    description: 'Successful authentication',
  })
  @Post('/login')
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    return await this.userService.authenticateUser(authLoginUserDto);
  }
}
