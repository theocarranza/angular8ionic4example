import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { UsersService } from './../../services/users.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  appPages = [

    {
      title: 'Usuários',
      url: 'usuarios',
      icon: 'contacts'
    },
    {
      title: 'Sair',
      url: '/auth',
      icon: 'exit'

    },
  ];

  public user: User;
  public user$: Observable<User[]>;

  constructor(private authService: AuthService, private readonly usersService: UsersService) { }

  ngOnInit() {
    this.user$ = this.usersService.users;
    this.user = this.authService.currentUserValue;

    console.table(this.user);
  }

  logout() {
    this.authService.logout();
  }

}