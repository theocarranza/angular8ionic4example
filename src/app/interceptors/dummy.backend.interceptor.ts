import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../models/user';

const users: User[] = [{ id: 1, email: 'dragan.gaic@gmail.com', password: 'password', fullName: 'Isaaac Foo' }];

@Injectable()
export class DummyBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    return next.handle(request);
            }
        }

        function authenticate() {
            const { email, password } = body;
            const user = users.find(user => user.email === email && user.password === password);
            if (!user) { return error('Email or password is incorrect'); }
            return ok({
                id: user.id,
                email: user.email,
                fullname: user.fullName
            });
        }

        function getUsers() {
            if (!isLoggedIn()) { return unauthorized(); }
            return ok(users);
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            const USER = JSON.parse(localStorage.getItem('currentUser'));
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.USER.data.access_token}`
                }
            });

            return next.handle(request);
            // return headers.get('Authorization') === `Basic ${window.btoa('test:test')}`;
        }
    }
}

export let dummyBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: DummyBackendInterceptor,
    multi: true
};