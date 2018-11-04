import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class ConnectionService {
  private url = 'http://localhost:3000';
  public socket: io;

  constructor() {
    this.socket = io(this.url);
  }
}
