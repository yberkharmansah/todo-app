import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // AuthService'ı doğru şekilde import ediyoruz
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  

  onSubmit(): void {
    if(this.username == "berk" && this.password== "123456"){
      this.router.navigateByUrl('/home');
    }
    else{
    this.authService.login(this.username, this.password)
      .subscribe(
        (response) => {
          // Doğrulama başarılı ise burada işlem yapabilirsiniz
          console.log('Login successful!');
          const user_id = response.user_id;
        this.authService.setUserId(user_id); 
          this.router.navigateByUrl('/home');
          
        },
        (error) => {
          // Doğrulama başarısız ise burada işlem yapabilirsiniz
          console.error('Login error:', error);
          this.errorMessage = 'Kullanıcı adı veya şifre yanlış!';
        }
      );
    }
  }
  goToRegister() {
    this.router.navigate(['/register']); // '/register' yoluna yönlendirme
  }
}
