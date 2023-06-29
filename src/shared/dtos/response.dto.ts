import { ApiProperty } from "@nestjs/swagger";

export class Response {
  @ApiProperty()
  status: boolean;

  @ApiProperty()
  msg: string;
}