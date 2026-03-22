export interface IComment {
  _id: string;
  content: string;
  image: string;
  commentCreator: ICommentCreator;
  post: string;
  parentComment?: any;
  likes: any[];
  createdAt: string;
  repliesCount: number;
}

interface ICommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
