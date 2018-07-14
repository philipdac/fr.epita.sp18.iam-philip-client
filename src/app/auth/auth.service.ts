import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { LoginRequest } from '../models/login-request';

@Injectable()
export class AuthService
{
    private loginUrl = '/login';
    private signInRoute = '/signin';
    private tokenKey = 'iam_token';
    private userKey = 'iam_user';
    private expiredKey = 'iam_token_expired_at';

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    public getToken()
    {
        const token = localStorage.getItem(this.tokenKey);
        if (token && moment().isBefore(this.getExpiration())) {
            return token;
        }
        return '';
    }

    private getExpiration()
    {
        let expiration = localStorage.getItem(this.expiredKey);
        if (!expiration) {
            expiration = '2018-01-01';
        }
        return moment(expiration);
    }

    public signedIn()
    {
        return (this.getToken() !== '');
    }

    public signIn(email: string, password: string)
    {
        const signInData: LoginRequest = { email: email, password: password };

        const options = {
            headers: new HttpHeaders({ "Content-Type": "application/json" }),
            observe: "response" as "body"
        };

        return this.http.post(this.loginUrl, signInData, options).pipe(
            map((resp: HttpResponse<any>) =>
            {
                if (resp.status === 200) {
                    this.setSession(resp.headers.get('authorization'));
                }
                return resp;
            }));
    }

    private setSession(bearer)
    {
        if (bearer) {
            const decode = this.parseJwt(bearer.substring(8));
            localStorage.setItem(this.userKey, decode['sub']);
            localStorage.setItem(this.expiredKey, (new Date((+decode['exp']) * 1000)).toISOString());
            localStorage.setItem(this.tokenKey, bearer);
        }
    }

    private parseJwt(token)
    {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    public signOut()
    {
        this.clearSession();
        this.router.navigateByUrl(this.signInRoute);
    }

    public clearSession()
    {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        localStorage.removeItem(this.expiredKey);
    }
}
