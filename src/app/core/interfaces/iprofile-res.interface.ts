export interface IProfileRes {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  isFollowing?: boolean;
  user: IMyProfile;
}

export interface IMyProfile {
  _id: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  cover: string;
  bookmarks: string[];
  followers: string[];
  following: string[];
  createdAt: string;
  passwordChangedAt: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}
