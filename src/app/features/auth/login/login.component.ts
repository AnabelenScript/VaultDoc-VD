import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth_service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../core/services/alerts/alerts'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

 onSubmit(): void {
  if (this.loginForm.invalid) {
    this.alertService.error('Por favor completa todos los campos correctamente.');
    return;
  }

  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe({
    next: () => {
      this.alertService.success('Login exitoso. Redirigiendo...');
      setTimeout(() => this.router.navigate(['/dashboard']), 1500);
    },
    error: (err) => {
      this.alertService.error('Credenciales inválidas o error de servidor.');
      console.error('Login error:', err);
    }
  });
}
}