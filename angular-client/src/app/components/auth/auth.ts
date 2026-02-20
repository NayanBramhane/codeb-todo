import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'auth.html',
  styleUrl: 'auth.css',
})
export class AuthComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLogin = signal(true);
  email = '';
  password = '';
  errorMessage = signal('');

  toggleMode() {
    this.isLogin.set(!this.isLogin());
    this.errorMessage.set('');
  }

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    const request = this.isLogin()
      ? this.authService.login(credentials)
      : this.authService.register(credentials);

    request.subscribe({
      next: () => this.router.navigate(['/todos']),
      error: (err) => this.errorMessage.set(err.error.message || 'An error occurred'),
    });
  }
}
