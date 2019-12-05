import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MaterialLibModule } from '@bhave/material-lib';

import { UsersPage } from './users.page';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'novo', component: UsersPage },
  { path: ':id', component: UsersPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialLibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersPage, UsersListComponent]
})
export class UsersPageModule { }
