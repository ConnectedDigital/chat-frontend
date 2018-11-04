import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/user.model';
import {ConnectionService} from './connection.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {
  username = new BehaviorSubject<string>(null);
  userSubject = new Subject<User>();

  constructor(private httpClient: HttpClient,
              private connection: ConnectionService) {
    this.connection.socket.on('user', (user: User) => this.userSubject.next(user));
  }

  getUsers() {
    return this.httpClient.get<User[]>(`${environment.backendUrl}/users`);
  }

  joinUser(user: User): void {
    this.connection.socket.emit('user', user);
  }
}
