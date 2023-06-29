import { ApiProperty } from "@nestjs/swagger";
import { Response } from "../../../shared/dtos/response.dto";

export class MovieQueryAPI {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  original_title: string;

  @ApiProperty()
  genre_ids: Array<number>;

  @ApiProperty()
  overview: string;

  @ApiProperty()
  original_language: string;

  @ApiProperty()
  adult: boolean;

  @ApiProperty()
  popularity: number;

  @ApiProperty()
  release_date: string;

  @ApiProperty()
  poster_path: string;

  @ApiProperty()
  backdrop_path: string;

  @ApiProperty()
  video: boolean;

  @ApiProperty()
  vote_average: number;

  @ApiProperty()
  vote_count: number;
}

export class MetadataMoviesQuery {
  @ApiProperty()
  page: number;

  @ApiProperty()
  total_pages: number;

  @ApiProperty()
  total_results: number;
}

export class MoviesQueryApiDto {
  page: number;
  total_pages: number;
  total_results: number;
  results: MovieQueryAPI[]
}

export class MoviesQueryDto extends Response {
  @ApiProperty()
  meta: MetadataMoviesQuery;

  @ApiProperty({ type: [MovieQueryAPI] })
  data: MovieQueryAPI[];
}
