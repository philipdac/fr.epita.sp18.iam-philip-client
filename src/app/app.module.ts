import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import
{
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
    MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDialogModule
} from '@angular/material';

import * as AppRoutes from './app.routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AppErrorModule } from './errors/app-error.module';
import { NotifyService } from './services/notify.service';

import { LayoutComponent } from './pages/layout/layout.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { SignInComponent } from './pages/signin/signin.component';
import { DialogConfirmCancelComponent } from './components/dialog-confirm-cancel/dialog-confirm-cancel.component';

import { IdentityEditComponent } from './components/identity-edit/identity-edit.component';
import { IdentityListComponent } from './components/identity-list/identity-list.component';
import { IdentityTableComponent } from './components/identity-table/identity-table.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        NavBarComponent,
        DialogConfirmCancelComponent,
        SignInComponent,
        IdentityTableComponent,
        IdentityEditComponent,
        IdentityListComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppErrorModule,
        FormsModule,
        HttpClientModule,
        LayoutModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterModule.forRoot(
            AppRoutes.AuthRoute
        )
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthGuard,
        AuthService,
        NotifyService
    ],
    bootstrap: [AppComponent],
    entryComponents: [DialogConfirmCancelComponent]
})
export class AppModule { }
