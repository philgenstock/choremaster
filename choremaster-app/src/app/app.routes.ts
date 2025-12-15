import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard')
    },
    {
        path: 'chores/:choreId',
        loadComponent: () => import('./pages/chore-detail/chore-detail').then(m => m.ChoreDetail)
    }
];
