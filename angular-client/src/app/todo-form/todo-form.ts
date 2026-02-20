import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  imports: [],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  todoTitle = signal('');
  todoDescription = signal('');

  async handleSubmit(e: Event) {
    try {
      e.preventDefault();
      console.log('Title : ', this.todoTitle());
      console.log('Description : ', this.todoDescription());
      // const res = await fetch('http://localhost:3000/api/todos', { method: 'POST' });
      // if (res.status == 201) {
      //   alert('Todo Created Successfully');
      // }
    } catch (error) {
      console.error('Error occured at TodoForm\n', error);
      alert('Error occurred while creating a Todo');
    }
  }

  updateTodoTitle(title: string) {
    this.todoTitle.set(title);
  }

  updateTodoDesc(desc: string) {
    this.todoDescription.set(desc);
  }
}
