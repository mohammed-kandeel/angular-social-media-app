export interface IUser {
  success: boolean;
  message: string;
  data: IData;
}
export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
}

export interface IData {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: IUser;
}
