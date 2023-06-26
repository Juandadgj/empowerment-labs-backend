import { Expose } from "class-transformer";
import { Genre } from "../shared/interfaces/genre.interface";
import { Language } from "../shared/interfaces/language.interface";

export class FilteredDataMovie {
  @Expose({name: 'id'})
  movieId: number;

  @Expose({name: 'imdb_id'})
  movieIMDBId: string;

  @Expose({name: 'spoken_languages'})
  language:  Array<object>;

  @Expose({name: 'genres'})
  genres: Array<object>;

  @Expose({name: 'original_language'})
  originalLanguage: string;

  @Expose({name: 'original_title'})
  title: string;

  @Expose({name: 'overview'})
  overview: string;

  @Expose({name: 'popularity'})
  popularity: number;

  @Expose({name: 'poster_path'})
  posterPath: string;

  @Expose({name: 'release_date'})
  releaseDate: string;

  @Expose({name: 'video'})
  video: Boolean;

  @Expose({name: 'vote_average'})
  voteAverage: number;

  @Expose({name: 'vote_count'})
  voteCount: number;
}
