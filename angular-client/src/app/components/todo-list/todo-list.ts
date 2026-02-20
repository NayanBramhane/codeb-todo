import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'todo-list.html',
  styleUrl: 'todo-list.css',
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  todos = signal<any[]>([]);
  newTitle = '';
  newDescription = '';

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (res) => this.todos.set(res.todos),
      error: () => this.router.navigate(['/login']), // Redirect if unauthorized
    });
  }

  addTodo() {
    if (!this.newTitle.trim()) return;
    this.todoService
      .createTodo({ title: this.newTitle, description: this.newDescription })
      .subscribe(() => {
        this.newTitle = '';
        this.newDescription = '';
        this.loadTodos(); // Refresh list
      });
  }

  toggleComplete(todo: any) {
    this.todoService.updateTodo(todo._id, { isCompleted: !todo.isCompleted }).subscribe(() => {
      this.loadTodos();
    });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
