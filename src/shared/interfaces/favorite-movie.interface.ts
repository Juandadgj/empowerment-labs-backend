export interface FavoriteMovieKey {
  favoriteId: number;
}

export interface FavoriteMovie extends FavoriteMovieKey {
  movieId: number;
  userId: number;
  createdAt: Date;
}
