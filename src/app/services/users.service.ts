import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {ConnectionService} from './connection.service';

@Injectable()
export class UsersService {
  private _username: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  constructor(private connection: ConnectionService) { }

  getUser(): Observable<User> {
    return Observable.create(observer => {
      this.connection.socket.on('user', (user: User) => observer.next(user));
    });
  }

  getUsers(): Observable<User[]> {
    return Observable.create(observer => {
      this.connection.socket.on('users', (users: User[]) => observer.next(users));
    });
  }

  joinUser(user: User): void {
    this.connection.socket.emit('user', user);
  }
}
