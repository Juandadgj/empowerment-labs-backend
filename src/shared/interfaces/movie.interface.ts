import { Genre } from "./genre.interface";
import { Language } from "./language.interface";

export interface MovieKey {
  movieId: number;
}

export interface Movie extends MovieKey {
  movieIMDBId: string;
  language:  Language[];
  genres: Genre[];
  originalLanguage: string;
  title: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  video: Boolean;
  voteAverage: number;
  voteCount: number;
}
