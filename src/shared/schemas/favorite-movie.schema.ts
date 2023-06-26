import { Schema } from "dynamoose";

export const FavoriteMovieSchema = new Schema({
  favoriteId: {
    type: Number,
    hashKey: true,
  },
  movieId: {
    type: Number,
  },
  userId: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  }
})
