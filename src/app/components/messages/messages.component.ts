import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {Message} from '../../models/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messagesService.getMessages()
      .subscribe((messages: Message[]) => this.messages.push(...messages));

    this.messagesService.messageSubject
      .subscribe((message: Message) => this.messages.push(message));
  }
}
