import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth';
import { TodoListComponent } from './components/todo-list/todo-list';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'todos', component: TodoListComponent },
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
