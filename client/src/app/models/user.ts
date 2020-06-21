export interface User {
  _id: string;
  username: string;
  email: string;
  registerDate: Date;
}

export type Token = string;

export interface UserWithToken {
  token: Token;
  user: User;
}
