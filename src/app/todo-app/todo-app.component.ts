import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from '../todo.service';
import { AuthService } from '../auth.service';
import { Todo } from '../models/todo.model';
import { SubTask } from '../models/subtask.model';
import { Todos } from '../models/todos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css']
})
export class TodoAppComponent implements OnInit {
  newTodoTitle: string = '';
  newSubTaskName: string = '';
  todos: Todo[] = [];
  subTasks: SubTask[] = [];
  currentIndex: number = 0;
  username: string | null = null;

  @ViewChild('addNewTodoModal') addNewTodoModal: any;
  @ViewChild('editTodoModal') editTodoModal: any;

  constructor(
    private modalService: NgbModal,
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchUserTodos();
    

  }

  fetchUserTodos() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.authService.getUserById(userId).subscribe(
        (userData: any) => {
          this.username = userData.username;
          console.log(this.username);
          
          this.todoService.getUserTodos(userId).subscribe(
            (todoData: Todos) => {
              if (todoData) {
                this.todos = todoData.todos;
                console.log(this.todos);
              } else {
                console.error('Todo verileri beklenen formatta değil:', todoData);
              }
            },
            (todoError) => {
              console.error('Todo getirme hatası:', todoError);
            }
          );
        },
        (userError: any) => {
          console.error('Kullanıcı adı alınamadı:', userError);
        }
      );
    }
  }
  
  logout() {
    // Çıkış işlemi
    // Kullanıcının oturumunu sonlandır
    // Login sayfasına yönlendir
    this.username = ''; // Kullanıcı adını temizle
    this.router.navigate(['/login']); // Login sayfasına yönlendir
  }
  openEditModal(index: number): void {
    this.currentIndex = index;
    this.modalService.open(this.editTodoModal, { centered: true });
  }

  openAddTodoModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  addNewTodo(): void {
    if (this.newTodoTitle.trim() === '') {
      return; // Boş todo eklenmesini önle
    }
  
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('Kullanıcı kimliği bulunamadı.');
      return;
    }
  
    const newTodoTitle = this.newTodoTitle;
  
    this.todoService.addNewTodoWithoutSubtasks(userId, newTodoTitle).subscribe(
      (addedTodo: Todo) => {
        this.todos.push(addedTodo);
        this.newTodoTitle = ''; // Yeni todo eklenince input'u temizle
        this.modalService.dismissAll(); // Modal'ı kapat
        this.fetchUserTodos();
      },
      (error) => {
        console.error('Todo eklerken hata oluştu:', error);
      }
    );
  }

  addSubTask(): void {
    if (this.newSubTaskName.trim() === '') {
      return; // Boş subtask eklenmesini önle
    }

    const todo = this.todos[this.currentIndex];
    if (!todo) {
      console.error('Seçilen todo bulunamadı.');
      return;
    }

    const newSubTask: SubTask = {
      subtask_id: 0, // Buraya geçici bir değer vermelisiniz, gerçek veritabanı kullanımına göre düzenlenmelidir
      title: this.newSubTaskName,
      completed: false
    };

    this.todoService.addSubTask(todo.todo_id, newSubTask).subscribe(
      (addedSubTask: SubTask) => {
        todo.subtasks.push(addedSubTask);
        this.newSubTaskName = ''; // Yeni subtask eklenince input'u temizle
        this.fetchUserTodos();
      },
      (error) => {
        console.error('Subtask eklerken hata oluştu:', error);
      }
    );
  }

  editTodo(): void {
    this.modalService.dismissAll();
  }

  deleteTask(index: number): void {
    const todo = this.todos[index];
    if (!todo) {
      console.error('Todo bulunamadı.');
      return;
    }
  
    this.todoService.deleteTodo(todo.todo_id).subscribe(
      () => {
        this.todos.splice(index, 1);
      },
      (error) => {
        console.error('Todo silme hatası:', error);
      }
    );
  }
  updateSubTaskCompletion(subTaskId: number, isCompleted: boolean): void {
    this.todoService.updateSubTaskCompletion(subTaskId, isCompleted).subscribe(
      () => {
        // Başarıyla tamamlandı
      },
      (error) => {
        console.error('Tamamlama durumu güncellenirken bir hata oluştu:', error);
      }
    );
  }
  deleteSubTask(todoIndex: number, subTaskIndex: number): void {
    const todo = this.todos[todoIndex];
    const subtask = todo.subtasks[subTaskIndex];
    if (!todo || !subtask) {
      console.error('Todo veya alt görev bulunamadı.');
      return;
    }
  
    this.todoService.deleteSubTask(subtask.subtask_id).subscribe(
      () => {
        todo.subtasks.splice(subTaskIndex, 1);
      },
      (error) => {
        console.error('Alt görev silme hatası:', error);
      }
    );
  }

  areAllSubtasksCompleted(todo: Todo): boolean {
    const subTasks = todo.subtasks;
    if (!subTasks || subTasks.length === 0) {
      return true;
    } else {
      return subTasks.every((subTask: SubTask) => subTask.completed);
    }
  }
}