import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DynamooseModule } from 'nestjs-dynamoose';
import { dynamooseFactory } from 'src/config/dynamoose.factory';
import { JwtStrategy } from '../../middlewares/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DynamooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: (_, configService: ConfigService) => dynamooseFactory(_, configService, 'User'),
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy]
})
export class UserModule {}
