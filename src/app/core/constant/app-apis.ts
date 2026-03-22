import { environment } from '../../../environments/environment';

export const App_Apis = {
  auth: {
    signUp: `${environment.baseUrl}/users/signup`,
    signin: `${environment.baseUrl}/users/signin`,
  },
  posts: `${environment.baseUrl}/posts`,

  bookmarksPosts: `${environment.baseUrl}/users/bookmarks`,

  users: `${environment.baseUrl}/users`,

  notifications: `${environment.baseUrl}/notifications`,
};
