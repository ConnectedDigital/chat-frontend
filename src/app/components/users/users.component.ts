import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../models/user.model';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  user$: Subscription;
  users$: Subscription;

  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.user$ = this.usersService.getUser()
      .subscribe((user: User) => {
        this.users.push(user);
      });

    this.users$ = this.usersService.getUsers()
      .subscribe((users: User[]) => {
        for (const user of users) {
          this.users.push(user);
        }
      });
  }

  ngOnDestroy() {
    if (this.user$ !== undefined) {
      this.user$.unsubscribe();
    }
    if (this.users$ !== undefined) {
      this.users$.unsubscribe();
    }
  }
}
