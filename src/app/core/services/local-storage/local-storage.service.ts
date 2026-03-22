import { Injectable } from '@angular/core';
import { Stored_Keys } from '../../constant/stored-keys';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private currentUser: any = null;
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem(Stored_Keys.route_posts_token);
    const userData = localStorage.getItem(Stored_Keys.route_posts_user);
    this.currentUser = userData ? JSON.parse(userData) : null;
  }

  getToken() {
    return this.token;
  }
  getUser() {
    return this.currentUser;
  }
  setUser(user: any, token: string) {
    this.currentUser = user;
    localStorage.setItem(Stored_Keys.route_posts_user, JSON.stringify(user));
    this.setToken(token);
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem(Stored_Keys.route_posts_token, token);
  }

  clearUserInfo() {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem(Stored_Keys.route_posts_token);
    localStorage.removeItem(Stored_Keys.route_posts_user);
  }
}
