import {Component} from '@angular/core';
import anchorme from 'anchorme';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  public messages = ['angular', 'hello', 'dobry dien', 'vk.com', 'https://google.com'];

  add(message) {
    this.messages.push(message);
  }

  delete() {
  }

  public isLink(message) {
    return anchorme.validate.url(message);
  }


}
