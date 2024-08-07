// todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todos } from './models/todos.model';
import { Todo } from './models/todo.model';
import { SubTask } from './models/subtask.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://127.0.0.1:5000'; // API URL'nizi buraya ekleyin

  constructor(private http: HttpClient) {}

  getUserTodos(userId: number): Observable<Todos> {
    return this.http.get<Todos>(`${this.apiUrl}/todo/user/${userId}`);
  }

  addNewTodoWithoutSubtasks(userId: number, newTodoTitle: string): Observable<Todo> {
    const body = { title: newTodoTitle };
    return this.http.post<Todo>(`${this.apiUrl}/add-todo/${userId}`, body);
  }

  addSubTask(todoId: number, subTask: SubTask): Observable<SubTask> {
    const url = `${this.apiUrl}/add-subtask/${todoId}`;
    return this.http.post<SubTask>(url, subTask);
  }
  deleteTodo(todoId: number): Observable<any> {
    const url = `${this.apiUrl}/delete-todo/${todoId}`;
    return this.http.delete(url);
  }

  deleteSubTask(subTaskId: number): Observable<any> {
    const url = `${this.apiUrl}/delete-subtask/${subTaskId}`;
    return this.http.delete(url);
  }
  updateSubTaskCompletion(subTaskId: number, isCompleted: boolean): Observable<any> {
    const url = `${this.apiUrl}/update-subtask-completion/${subTaskId}`;
    return this.http.put(url, { completed: isCompleted });
  }
  

  // Diğer todo işlemleri buraya eklenebilir (ekleme, güncelleme, silme vb.)
}
