import { Schema } from "dynamoose";
import { v4 } from 'uuid';

export const MovieNoteSchema = new Schema({
  noteId: {
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
  noteTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  }
})

export default MovieNoteSchema;
