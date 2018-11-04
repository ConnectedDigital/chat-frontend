import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user.model';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-user-join',
  templateUrl: './user-join.component.html',
  styleUrls: ['./user-join.component.css']
})
export class UserJoinComponent implements OnInit {
  @Input() modalID: string;
  userForm: FormGroup;

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
    this.usersService.username.next(this.userForm.get('username').value);
    const user = new User(null, this.userForm.get('username').value);

    this.usersService.joinUser(user);
    this.userForm.reset();
  }
}
