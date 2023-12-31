import { Schema } from 'dynamoose';

export const MovieSchema = new Schema({
  movieId: {
    type: Number,
    hashKey: true,
  },
  movieIMDBId: {
    type: String,
  },
  language: {
    type: Array,
  },
  genres: {
    type: Array,
  },
  originalLanguage: {
    type: String,
  },
  title: {
    type: String,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  posterPath: {
    type: String,
  },
  releaseDate: {
    type: String,
  },
  video: {
    type: Boolean,
  },
  voteAverage: {
    type: Number,
  },
  voteCount: {
    type: Number,
  },
})

export default MovieSchema
