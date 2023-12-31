import { Module } from '@nestjs/common';
import { ConfigService } from "@nestjs/config"
import { DynamooseModule } from 'nestjs-dynamoose';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { dynamooseFactory } from '../../config/dynamoose.factory';
import { AxiosService } from 'src/services/axios.service';

@Module({
  imports: [
    DynamooseModule.forFeatureAsync([
      {
        name: 'Movie',
        useFactory: (_, configService: ConfigService) => dynamooseFactory(_, configService, 'Movie'),
        inject: [ConfigService],
      },
      {
        name: 'FavoriteMovie',
        useFactory: (_, configService: ConfigService) => dynamooseFactory(_, configService, 'FavoriteMovie'),
        inject: [ConfigService],
      },
      {
        name: 'MovieNote',
        useFactory: (_, configService: ConfigService) => dynamooseFactory(_, configService, 'MovieNote'),
        inject: [ConfigService],
      },
      {
        name: 'User',
        useFactory: (_, configService: ConfigService) => dynamooseFactory(_, configService, 'User'),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService, AxiosService]
})
export class MovieModule {}
