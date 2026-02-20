import { Component } from '@angular/core';
import { Card } from '../card/card';
import { TodoForm } from '../todo-form/todo-form';

@Component({
  selector: 'app-dashboard',
  imports: [Card, TodoForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
