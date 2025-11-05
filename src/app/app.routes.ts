import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'backlog',
        pathMatch: 'full'
      },
      {
        path: 'backlog',
        loadComponent: () => import('./pages/tasks/tasks.component').then(m => m.TasksComponent)
      },
      {
        path: 'kanban',
        loadComponent: () => import('./pages/kanban/kanban.component').then(m => m.KanbanComponent)
      }
    ]
  }
];
