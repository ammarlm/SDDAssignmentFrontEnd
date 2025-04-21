import { Routes } from '@angular/router';
import { AuthGuard } from './login/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', canActivate: [AuthGuard], loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
    { path: 'auth', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
];
