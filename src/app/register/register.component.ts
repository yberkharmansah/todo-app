import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // AuthService'ı doğru şekilde import ediyoruz
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  
  onSubmit(): void {
    // Kayıt işlemleri burada gerçekleştirilir
    this.authService.register(this.username, this.password)
      .subscribe(
        (response) => {
          // Kayıt başarılı ise burada işlem yapabilirsiniz
          console.log('Registration successful!');
          this.router.navigateByUrl('/login'); // Kayıt başarılıysa giriş sayfasına yönlendirme
        },
        (error) => {
          // Kayıt başarısız ise burada işlem yapabilirsiniz
          console.error('Registration error:', error);
          this.errorMessage = 'Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.';
        }
      );
  }

  goToLogin() {
    this.router.navigate(['/login']); // '/login' yoluna yönlendirme
  }
}
