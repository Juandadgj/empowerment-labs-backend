export interface UserKey {
  userId?: string;
}

export interface User extends UserKey {
  name: string;
}
