import { ConfigService } from '@nestjs/config';

export const dynamooseFactory = (_, configService: ConfigService, schemaName: string) => {
  const schema = require(`../shared/schemas/${schemaName.toLowerCase()}.schema`).default;
  const stage = configService.get<string>('STAGE')
  const name = configService.get<string>(`${schemaName.toUpperCase()}_TABLE_NAME`);
  const tableName = `${name}-${stage}`

  return {
    schema,
    options: {
      tableName,
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
