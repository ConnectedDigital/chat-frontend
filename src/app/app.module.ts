import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageSendComponent } from './components/messages/message-send/message-send.component';
import { UsersComponent } from './components/users/users.component';
import { UserJoinComponent } from './components/users/user-log-in/user-join.component';

import {ConnectionService} from './services/connection.service';
import {MessagesService} from './services/messages.service';
import {UsersService} from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MessageSendComponent,
    UsersComponent,
    UserJoinComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ConnectionService,
    MessagesService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
