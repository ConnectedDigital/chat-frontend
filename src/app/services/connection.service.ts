import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class ConnectionService {
  private url = 'http://localhost:3000';
  private readonly _socket: io;

  get socket() {
    return this._socket;
  }

  constructor() {
    this._socket = io(this.url);
  }
}
