import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { UsersService } from 'src/app/services/users.service';

import { User } from 'src/app/models/user';
import { SnackbarService } from '@bhave/material-lib';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public snackbarService: SnackbarService,
  ) { }

  ngOnInit() {
    // Original users list service => this.users$ = this.usersService.listUsers();
    this.users$ = this.usersService.users;
  }

  trackByFunction(index: number, model: any) {
    return model.id;
  }

  add() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  update(id: number): void {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }

  delete(id: number) {
    return this.usersService.deleteLocalUser(id).subscribe(() => this.snackbarService.createSnack('Usuário removido com sucesso.'))
  }


}
