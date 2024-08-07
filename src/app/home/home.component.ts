import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // AuthService'ınizin bulunduğu yol
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  constructor(private router: Router,
    private authService: AuthService,
    private todoService: TodoService) {}

  goToTodo() {

          this.router.navigateByUrl('/todo');
  }
}
