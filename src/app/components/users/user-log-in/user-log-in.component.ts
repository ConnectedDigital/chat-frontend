import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user.model';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {
  @Input() id: string;
  userForm: FormGroup;

  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.initializeUserForm();
  }

  private initializeUserForm() {
    this.userForm = new FormGroup({
      'username': new FormControl(null, Validators.required)
    });
  }

  onJoinUser() {
    this.usersService.username = this.userForm.get('username').value;
    const user = new User(null, this.usersService.username);

    this.usersService.joinUser(user);
    this.userForm.reset();
  }
}
