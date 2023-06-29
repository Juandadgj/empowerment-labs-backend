import { ApiProperty } from "@nestjs/swagger";

export class AddFavoriteDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  movieId: number;
}
