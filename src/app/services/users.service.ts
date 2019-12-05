import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private users$: BehaviorSubject<User[]>;
  public users: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.users$ = new BehaviorSubject<User[]>(JSON.parse(localStorage.getItem('USERS')));
    this.users = this.users$.asObservable();
  }

  public listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.bffUrl}/Profile/List?limit=30/`);
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.bffUrl}/Profile/Register`, user);
  }

  public clear() {
    this.users$.next(undefined);
    localStorage.removeItem('USERS');
  }

  public setLocalUsers() {
    const users: User[] = [
      {
        id: uuid.v4(),
        fullName: 'John Foo',
        email: 'foo@bar.com',
        login: 'foo',
        cpf: '111.222.333-4'
      },
      {
        id: uuid.v4(),
        fullName: 'Mary Foo',
        email: 'foo@bar.com',
        login: 'foo',
        cpf: '111.222.333-4'
      },
      {
        id: uuid.v4(),
        fullName: 'Martin Foo',
        email: 'foo@bar.com',
        login: 'foo',
        cpf: '111.222.333-4'
      },
      {
        id: uuid.v4(),
        fullName: 'Gandalf',
        email: 'foo@bar.com',
        login: 'foo',
        cpf: '111.222.333-4'
      },
      {
        id: uuid.v4(),
        fullName: 'Ronald Reagan',
        email: 'foo@bar.com',
        login: 'foo',
        cpf: '111.222.333-4'
      },
    ];
    localStorage.setItem('USERS', JSON.stringify(users));
    this.users$.next(users);
  }

  getLocalUsers(): User[] {
    return this.users$.value;
  }

  getLocalUser(id: number): User {
    const users = JSON.parse(localStorage.getItem('USERS'));
    const user = users.find((localUser: User) => localUser.id = id);
    console.log(user);

    return user;
  }

  public addLocalUser(user: User): Observable<User[]> {
    const localUsers = JSON.parse(localStorage.getItem('USERS'));

    const newLocalUsers = [
      ...localUsers, user
    ];

    localStorage.setItem('USERS', JSON.stringify(newLocalUsers));
    this.users$.next(newLocalUsers);

    return this.users;
  }

  deleteLocalUser(id: number): Observable<User[]> {
    const localUsers = JSON.parse(localStorage.getItem('USERS'));

    const newLocalUsers = localUsers.filter(user => user.id !== id);
    localStorage.setItem('USERS', JSON.stringify(newLocalUsers));
    this.users$.next(newLocalUsers);
    return this.users;
  }

  updateLocalUser(user: User): Observable<User[]> {
    const oldLocalUsers = JSON.parse(localStorage.getItem('USERS'));

    let newLocalUsers = oldLocalUsers.filter((localUser: User) => localUser.id !== user.id);

    newLocalUsers = [
      ...newLocalUsers, user
    ];
    console.log(user);

    localStorage.setItem('USERS', JSON.stringify(newLocalUsers));
    this.users$.next(newLocalUsers);
    return this.users;
  }
}
