export interface MovieNoteKey {
  noteId: number;
}

export interface MovieNote extends MovieNoteKey {
  movieId: number;
  userId: number;
  noteTitle: string;
  description: string;
  createdAt: Date;
}
