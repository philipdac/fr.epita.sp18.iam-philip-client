import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { SignInComponent } from './pages/signin/signin.component';
import { IdentityEditComponent } from './components/identity-edit/identity-edit.component';
import { IdentityListComponent } from './components/identity-list/identity-list.component';

export const RouteDef = [
    { path: 'identities/:uid', component: IdentityEditComponent },
    { path: 'identities', component: IdentityListComponent },

    { path: '', component: IdentityListComponent },
    { path: '**', component: IdentityListComponent }
];

export const AuthRoute: Routes = [
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: RouteDef
    }
];
