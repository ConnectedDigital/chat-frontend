import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';
  private socket: io;

  constructor() {
    this.socket = io(this.url);
  }

  public connect() {
    this.socket.on('connect', () => console.log('Connected to server...'));
  }

  public joinUser(username: string) {
    this.socket.emit('join-user', username);
  }

  public getUsers() {
    return Observable.create(observer => {
      this.socket.on('join-user', (user) => observer.next(user));
    });
  }

  public sendMessage(username: string, text: string): void {
    this.socket.emit('message', {username, text});
  }

  public getMessages() {
    return Observable.create(observer => {
      this.socket.on('message', ({username, text, timestamp}) => observer.next({username, text, timestamp}));
    });
  }
}
