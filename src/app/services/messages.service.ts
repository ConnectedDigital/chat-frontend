import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {Message} from '../models/message.model';
import {ConnectionService} from './connection.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MessagesService {
  messageSubject = new Subject<Message>();

  constructor(private httpClient: HttpClient,
              private connection: ConnectionService) {
    this.connection.socket.on('message', (message: Message) => this.messageSubject.next(message));
  }

  getMessages() {
    return this.httpClient.get<Message[]>(`${environment.backendUrl}/messages`);
  }

  sendMessage(message: Message): void {
    this.connection.socket.emit('message', message);
  }
}
