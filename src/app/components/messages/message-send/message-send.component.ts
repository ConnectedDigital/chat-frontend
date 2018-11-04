import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../../models/message.model';
import {MessagesService} from '../../../services/messages.service';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.css']
})
export class MessageSendComponent implements OnInit {
  messageForm: FormGroup;

  constructor(private messagesService: MessagesService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.initializeMessageForm();
  }

  private initializeMessageForm() {
    this.messageForm = new FormGroup({
      'message': new FormControl( {value: null, disabled: false},
        [Validators.required, Validators.minLength(1)])
    });
  }

  onSendMessage() {
    const text = this.messageForm.get('message').value;
    let from;
    this.usersService.username
      .subscribe((username: string) => from = username);

    if (!from) {
      from = 'anonymous';
    }

    const message = new Message(null, from, text, null);

    this.messagesService.sendMessage(message);
    this.messageForm.reset();
  }
}
