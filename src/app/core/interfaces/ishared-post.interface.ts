import { TopComment } from './i-post.interface';

export interface ISharedPost {
  _id: string;
  image?: string;
  privacy: string;
  user: IUser;
  sharedPost: any;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment?: TopComment;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  body?: string;
}

interface IUser {
  _id: string;
  name: string;
  username?: string;
  photo: string;
}
