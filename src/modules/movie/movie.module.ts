import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from "@nestjs/config"
import { DynamooseModule } from 'nestjs-dynamoose';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieSchema } from '../../shared/schemas/movie.schema';
import { dynamooseFactory } from '../../config/dynamoose.factory';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DynamooseModule.forFeatureAsync([
      {
        name: 'Movie',
        useFactory: (_, configService: ConfigService) => dynamooseFactory(_, configService, 'Movie'),
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
