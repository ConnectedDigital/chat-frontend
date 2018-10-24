import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatService} from './services/chat.service';
import {Message} from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userForm: FormGroup;
  messageForm: FormGroup;

  username = '';
  users: string[] = [];

  text = '';
  message: Message;
  messages: Message[] = [];

  constructor(private chatService: ChatService) {}

  private initializeUserForm() {
    this.userForm = new FormGroup({
      'username': new FormControl(null, Validators.required)
    });
  }

  private initializeMessageForm() {
    this.messageForm = new FormGroup({
      'message': new FormControl( {value: null, disabled: true}, [Validators.required, Validators.minLength(1)])
    });
  }

  ngOnInit() {
    this.initializeUserForm();
    this.initializeMessageForm();

    this.chatService.connect();

    this.chatService.getMessages()
      .subscribe(({username, text, timestamp}) => {
        this.message = new Message(username, text, timestamp);
        this.messages.push(this.message);
      });

    this.chatService.getUsers()
      .subscribe(user => this.users.push(user));
  }

  onJoinUser() {
    this.username = this.userForm.get('username').value;

    this.chatService.joinUser(this.username);
    this.userForm.reset();
    this.messageForm.get('message').enable();
  }

  onSendMessage() {
    this.text = this.messageForm.get('message').value;

    this.chatService.sendMessage(this.username, this.text);
    this.messageForm.reset();
  }
}
