import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';
import {User} from '../models/user.model';
import {Message} from '../models/message.model';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';
  private socket: io;

  constructor() {
    this.socket = io(this.url);
  }

  connect(): void {
    this.socket.on('connect', () => {
      console.log('Connected to server...');
    });
  }

  getUser(): Observable<User> {
    return Observable.create(observer => {
      this.socket.on('user', (user: User) => observer.next(user));
    });
  }

  getUsers(): Observable<User[]> {
    return Observable.create(observer => {
      this.socket.on('users', (users: User[]) => observer.next(users));
    });
  }

  joinUser(user: User): void {
    this.socket.emit('user', user);
  }

  getMessage(): Observable<Message> {
    return Observable.create(observer => {
      this.socket.on('message', (message: Message) => observer.next(message));
    });
  }

  getMessages(): Observable<Message[]> {
    return Observable.create(observer => {
      this.socket.on('messages', (messages: Message[]) => observer.next(messages));
    });
  }

  sendMessage(message: Message): void {
    this.socket.emit('message', message);
  }
}
