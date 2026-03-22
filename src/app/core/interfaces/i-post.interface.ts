import { ISharedPost } from './ishared-post.interface';

export interface IPost {
  _id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: IUser;
  sharedPost?: ISharedPost;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment?: TopComment2;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
  sharedPostUnavailable?: boolean;
}

interface IUser {
  _id: string;
  name: string;
  username?: string;
  photo: string;
}

export interface CommentCreator {
  _id: string;
  name: string;
  photo: string;
  username?: string;
}

export interface TopComment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: any;
  likes: string[];
  createdAt: string;
  image?: string;
}

export interface TopComment2 {
  _id: string;
  content?: string;
  commentCreator: CommentCreator2;
  post: string;
  parentComment: any;
  likes: string[];
  createdAt: string;
  image?: string;
}

export interface CommentCreator2 {
  _id: string;
  name: string;
  username?: string;
  photo: string;
}
