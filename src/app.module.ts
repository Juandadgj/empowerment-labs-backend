import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';
import { databaseFactory } from './config/database.factory';
import { MovieModule } from './modules/movie/movie.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DynamooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => databaseFactory(configService),
      inject: [ConfigService],
    }),
    MovieModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})

export class AppModule {}
