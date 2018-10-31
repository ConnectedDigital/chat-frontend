import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {Message} from '../models/message.model';
import {ConnectionService} from './connection.service';

@Injectable()
export class MessagesService {

  constructor(private connection: ConnectionService) { }

  getMessage(): Observable<Message> {
    return Observable.create(observer => {
      this.connection.socket.on('message', (message: Message) => observer.next(message));
    });
  }

  getMessages(): Observable<Message[]> {
    return Observable.create(observer => {
      this.connection.socket.on('messages', (messages: Message[]) => observer.next(messages));
    });
  }

  sendMessage(message: Message): void {
    this.connection.socket.emit('message', message);
  }
}
