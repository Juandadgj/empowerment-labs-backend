import { Schema } from "dynamoose";
import { v4 } from 'uuid';

export const FavoriteMovieSchema = new Schema({
  favoriteId: {
    type: String,
    default: v4,
    hashKey: true,
  },
  movieId: {
    type: Number,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  }
})

export default FavoriteMovieSchema;
