import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatService} from './services/chat.service';
import {Message} from './models/message.model';
import {User} from './models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Subscription;
  users$: Subscription;
  message$: Subscription;
  messages$: Subscription;

  userForm: FormGroup;
  messageForm: FormGroup;

  username = '';
  users: User[] = [];

  text = '';
  messages: Message[] = [];

  constructor(private chatService: ChatService) {}

  private initializeUserForm() {
    this.userForm = new FormGroup({
      'username': new FormControl(null, Validators.required)
    });
  }

  private initializeMessageForm() {
    this.messageForm = new FormGroup({
      'message': new FormControl( {value: null, disabled: true},
        [Validators.required, Validators.minLength(1)])
    });
  }

  ngOnInit() {
    this.initializeUserForm();
    this.initializeMessageForm();

    this.chatService.connect();

    this.user$ = this.chatService.getUser()
      .subscribe((user: User) => {
        this.users.push(user);
      });

    this.users$ = this.chatService.getUsers()
      .subscribe((users: User[]) => {
        for (const user of users) {
          this.users.push(user);
        }
      });

    this.message$ = this.chatService.getMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });

    this.messages$ = this.chatService.getMessages()
      .subscribe((messages: Message[]) => {
        for (const message of messages) {
          this.messages.push(message);
        }
      });
  }

  onJoinUser() {
    this.username = this.userForm.get('username').value;
    const user = new User('', this.username);

    this.chatService.joinUser(user);
    this.userForm.reset();
    this.messageForm.get('message').enable();
  }

  onSendMessage() {
    this.text = this.messageForm.get('message').value;
    const message = new Message('', this.username, this.text, null);

    this.chatService.sendMessage(message);
    this.messageForm.reset();
  }

  ngOnDestroy() {
    if (this.user$ !== undefined) {
      this.user$.unsubscribe();
    }
    if (this.users$ !== undefined) {
      this.users$.unsubscribe();
    }
    if (this.message$ !== undefined) {
      this.message$.unsubscribe();
    }
    if (this.messages$ !== undefined) {
      this.messages$.unsubscribe();
    }
  }
}
