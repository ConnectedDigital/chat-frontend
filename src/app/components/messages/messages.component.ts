import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../models/message.model';
import {MessagesService} from '../../services/messages.service';
import {Subscription} from 'rxjs';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  message$: Subscription;
  messages$: Subscription;

  messageForm: FormGroup;
  messages: Message[] = [];

  constructor(private messagesService: MessagesService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.initializeMessageForm();

    this.messages$ = this.messagesService.getMessages()
      .subscribe((messages: Message[]) => {
        for (const message of messages) {
          this.messages.push(message);
        }
      });

    this.message$ = this.messagesService.getMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });
  }

  private initializeMessageForm() {
    this.messageForm = new FormGroup({
      'message': new FormControl( {value: null, disabled: false},
        [Validators.required, Validators.minLength(1)])
    });
  }

  onSendMessage() {
    const text = this.messageForm.get('message').value;
    let from = this.usersService.username;

    if (!from) {
      from = 'anonymous';
    }

    const message = new Message(null, from, text, null);

    this.messagesService.sendMessage(message);
    this.messageForm.reset();
  }

  ngOnDestroy() {
    if (this.message$ !== undefined) {
      this.message$.unsubscribe();
    }
    if (this.messages$ !== undefined) {
      this.messages$.unsubscribe();
    }
  }
}
