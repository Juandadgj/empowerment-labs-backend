import { ConfigService } from '@nestjs/config';
import { DynamooseModuleOptions } from 'nestjs-dynamoose';

export function databaseFactory(configService: ConfigService): DynamooseModuleOptions {
  return {
    aws: {
      accessKeyId: configService.get<string>('ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('SECRET_ACCESS_KEY'),
      region: configService.get<string>('REGION'),
    },
    logger: false,
  };
}
