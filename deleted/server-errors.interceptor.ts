import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifyService } from '../services/notify.service';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Retry when the error is Timeout or No response
        return next.handle(request).pipe(
            catchError(err => {
                console.log('ServerErrorsInterceptor captured: ', err);

                let msg = '';
                switch (err.status) {
                    case 444:
                    case 504:
                        msg = 'Can not connect to the server.';
                        break;
                    default:
                        msg = 'Error happened at server side.';
                }

                let tag = ' Please try again or call for support. (Dev: see console for more detail)'
                const notify = this.injector.get(NotifyService);
                notify.error(msg + tag);

                throw err;
            })
        );
    }
}
