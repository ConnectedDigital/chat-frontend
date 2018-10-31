import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MessagesComponent } from './components/messages/messages.component';
import { UsersComponent } from './components/users/users.component';
import { UserLogInComponent } from './components/users/user-log-in/user-log-in.component';

import {ConnectionService} from './services/connection.service';
import {MessagesService} from './services/messages.service';
import {UsersService} from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    UserLogInComponent,
    MessagesComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConnectionService,
    MessagesService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
