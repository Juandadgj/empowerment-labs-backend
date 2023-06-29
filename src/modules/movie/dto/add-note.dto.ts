import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class AddNoteDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNumber()
  movieId: number;

  @ApiProperty()
  @IsString()
  noteTitle: string;

  @ApiProperty()
  @IsString()
  description: string;
}
