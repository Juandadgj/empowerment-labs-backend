import { Schema } from "dynamoose";

export const MovieNoteSchema = new Schema({
  noteId: {
    type: Number,
    hashKey: true,
  },
  movieId: {
    type: Number,
  },
  userId: {
    type: Number,
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
