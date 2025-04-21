import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
    { path: 'auth', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
];
