import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/todos';

  getTodos(page: number = 1, limit: number = 10, keyword: string = '') {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (keyword) params = params.set('keyword', keyword);
    
    return this.http.get<any>(this.apiUrl, { params });
  }

  createTodo(todo: { title: string; description?: string }) {
    return this.http.post<any>(this.apiUrl, todo);
  }

  updateTodo(id: string, data: { title?: string; description?: string; isCompleted?: boolean }) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteTodo(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}