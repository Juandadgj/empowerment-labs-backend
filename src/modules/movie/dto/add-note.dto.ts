import { ApiProperty } from "@nestjs/swagger";

export class AddNoteDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  movieId: number;

  @ApiProperty()
  noteTitle: string;

  @ApiProperty()
  description: string;
}
