import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService: AuthService;

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestToForward = request;

        if (this.authService === undefined) {
            this.authService = this.injector.get(AuthService);
        }

        if (this.authService !== undefined) {
            const token = this.authService.getToken();
            if (token !== '') {
                const tokenValue = 'Bearer ' + token;
                requestToForward = request.clone({ setHeaders: { 'Authorization': tokenValue } });
            }
        }
        return next.handle(requestToForward);
    }
}
