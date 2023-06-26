import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DynamooseModule } from 'nestjs-dynamoose';
import { dynamooseFactory } from 'src/config/dynamoose.factory';

@Module({
  imports: [
    DynamooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: (_, configService: ConfigService) => dynamooseFactory(_, configService, 'User'),
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
