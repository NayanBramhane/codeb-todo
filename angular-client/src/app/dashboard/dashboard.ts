import { Component } from '@angular/core';
import { Card } from '../card/card';
import { TodoForm } from '../todo-form/todo-form';

export type Todo = {
  id?: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
};

@Component({
  selector: 'app-dashboard',
  imports: [Card, TodoForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  todos: Todo[] = [{ id: '1', title: 'first task', description: 'first desc', isCompleted: false }];
}
