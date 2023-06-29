export interface FavoriteMovieKey {
  favoriteId?: string;
}

export interface FavoriteMovie extends FavoriteMovieKey {
  movieId: number;
  userId: string;
  createdAt?: Date;
}
