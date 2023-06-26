import { ConfigService } from '@nestjs/config';
import { MovieSchema } from '../shared/schemas/movie.schema';

export const dynamooseFactory = (_, configService: ConfigService, schemaName: string) => {
  const tableName = configService.get<string>(`${schemaName.toUpperCase()}_TABLE_NAME`);
  const schema = require(`../shared/schemas/${schemaName.toLowerCase()}.schema`).default;

  return {
    schema: schema,
    options: {
      tableName: tableName,
      type: 'document',
      create: false,
      waitForActive: {
        enabled: true,
        check: {
          timeout: 180000,
          frequency: 1000,
        },
      },
      get: {
        consistent: true,
      },
    },
  };
}
