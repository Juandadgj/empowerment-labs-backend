import { Genre } from "./genre.interface";
import { Language } from "./language.interface";

export interface UserKey {
  userId: number;
}

export interface User extends UserKey {
  name: string;
}
