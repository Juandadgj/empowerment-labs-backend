export interface MovieNoteKey {
  noteId?: string;
}

export interface MovieNote extends MovieNoteKey {
  movieId: number;
  userId: string;
  noteTitle: string;
  description: string;
  createdAt?: Date;
}
