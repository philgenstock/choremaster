import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login')
    },
    {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard'),
        canActivate: [authGuard]
    },
    {
        path: 'household/:householdId',
        loadComponent: () => import('./pages/household-detail/household-detail'),
        canActivate: [authGuard]
    },
    {
        path: 'chores/:choreId',
        loadComponent: () => import('./pages/chore-detail/chore-detail').then(m => m.ChoreDetail),
        canActivate: [authGuard]
    }
];
