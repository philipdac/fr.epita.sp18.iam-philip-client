import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'iam-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit
{

    email = new FormControl('admin@email.com', [
        Validators.required,
        Validators.email,
    ]);
    password = new FormControl('Admin1234', [
        Validators.required
    ]);

    returnUrl: string;
    defaultRoute = '/identities';

    hidePassword = true;

    signInError = false;
    connectionError = false;

    signInSubscription: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
    ) { }

    ngOnInit()
    {
        this.titleService.setTitle('Sign in');

        // reset login status
        this.authService.clearSession();

        // get return url from route parameters or default
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.defaultRoute;
    }

    signIn()
    {
        this.signInError = false;
        this.connectionError = false;

        if (this.email.invalid) {
            this.signInError = true;
            return;
        }

        this.signInSubscription = this.authService.signIn(this.email.value.toUpperCase(), this.password.value).subscribe(
            response =>
            {
                this.router.navigateByUrl(this.returnUrl);
            },
            error =>
            {
                if (error.status == 444 || error.status == 504) {
                    this.connectionError = true;
                } else {
                    this.signInError = true;
                }
            }
        );
    }
}
