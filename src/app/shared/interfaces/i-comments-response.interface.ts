import { IComment } from './icomment.interface';

export interface ICommentsResponse {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}

interface Data {
  comments: IComment[];
}

interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
  nextPage: number;
}
