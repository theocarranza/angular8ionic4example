import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsersService } from 'src/app/services/users.service';

import { SnackbarService } from '@bhave/material-lib';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

const MIN_LENGTH_NAME = 3;
const MIN_LENGTH_PASSWORD = 8;
declare var require: any;


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  private id: any;
  public sending = false;
  public form: FormGroup;
  public formTitle: string;
  public user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {

    const ObjectID = require('bson-objectid');
    const ID = ObjectID.generate(Date.now());
    this.form = this.formBuilder.group({
      id: [ID],
      fullName: ['', [Validators.required, Validators.minLength(MIN_LENGTH_NAME)]],
      login: ['', [Validators.required, Validators.minLength(MIN_LENGTH_NAME)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(MIN_LENGTH_PASSWORD)]],
      password_confirm: ['', [Validators.minLength(MIN_LENGTH_PASSWORD)]],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.user = undefined;
    this.id = this.route.snapshot.paramMap.get('user_id') || undefined;
    this.formTitle = this.id ? 'Alterar usuário' : 'Criar usuário';
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.id) {
      this.user = this.usersService.getLocalUser(this.id);
      console.log(this.user);

      this.fillForm(this.user);
    }

  }

  fillForm(user: User) {
    this.form.patchValue(
      { id: user.id, fullName: user.fullName, email: user.email, login: user.login, cpf: user.cpf }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.usersService.register(this.form.value).subscribe(
        user => {
          this.snackbarService.createSnack(`Usuário ${this.form.value.fullName} criado com sucesso!`);
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error: Error) => this.snackbarService.createSnack(`Ocorreu o seguinte erro: ${error.message}`)
      );
    }
  }

  addLocalUser(form: FormGroup) {
    this.usersService.addLocalUser(form.value).subscribe(() => {
      this.snackbarService.createSnack(`Usuário ${this.form.value.fullName} criado com sucesso!`);
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  update(form: FormGroup) {
    this.usersService.updateLocalUser(form.value).subscribe(user => {
      this.snackbarService.createSnack(`Usuário ${this.form.value.fullName} editado com sucesso!`);
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }


  public back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


}
