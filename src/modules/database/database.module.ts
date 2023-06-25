import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { DynamooseDatabaseFactory } from './database.factory';

@Module({
  imports: [
    DynamooseModule.forRootAsync({
      useFactory: DynamooseDatabaseFactory,
    })
  ],
  //providers: [DynamooseDatabaseFactory],
  exports: [
    DynamooseModule,
  ]
})
export class DatabaseModule {}
