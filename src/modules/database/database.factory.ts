import { ConfigType } from "@nestjs/config"
import databaseConfig from "../../config/database.config"

export const DynamooseDatabaseFactory = ({
  dynamodb: configService,
}: ConfigType<typeof databaseConfig>) => {
  return {
    aws: {
      accessKeyId: configService.aws.accessKeyId as string,
      secretAccessKey: configService.aws.secretAccessKey as string,
      region: configService.aws.region as string,
    },
    logger: configService.logger as boolean,
  }
}
