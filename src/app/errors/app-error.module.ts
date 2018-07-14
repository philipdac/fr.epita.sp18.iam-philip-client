import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppErrorHandler } from './app-error-handler';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler,
        },
    ]
})
export class AppErrorModule { }
