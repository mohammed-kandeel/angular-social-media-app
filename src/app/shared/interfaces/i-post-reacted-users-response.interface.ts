export interface IPostReactedUsersResponse {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}

export interface Data {
  likes: IReactedUser[];
}

export interface IReactedUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
}
