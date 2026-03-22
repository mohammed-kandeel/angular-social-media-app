export interface INotificationsResponse {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}

export interface Data {
  notifications: INotification[];
}

export interface INotification {
  _id: string;
  recipient: Recipient;
  actor: Actor;
  type: 'comment_post' | 'share_post' | 'like_post' | 'follow_user';
  entityType: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
  entity: Entity;
}

export interface Recipient {
  _id: string;
  name: string;
  photo: string;
}

export interface Actor {
  _id: string;
  name: string;
  photo: string;
}

export interface Entity {
  _id: string;
  content?: string;
  commentCreator?: CommentCreator;
  post?: string;
  likesCount?: number;
  isReply?: boolean;
  id?: string;
  body?: string;
  user?: string;
  commentsCount?: number;
  topComment?: TopComment;
  sharesCount?: number;
  isShare?: boolean;
  image?: string;
  name?: string;
  username?: string;
  photo?: string;
  followersCount?: number;
  followingCount?: number;
  bookmarksCount?: number;
  unavailable?: boolean;
}

export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}

export interface TopComment {
  _id: string;
  content: string;
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
  username: string;
  photo: string;
}

export interface Meta {
  feedMode: string;
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
}
