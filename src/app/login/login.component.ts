import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls:['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  private jwtHelper = inject(JwtHelperService);
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    handler: HttpBackend
    
    
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.http = new HttpClient(handler);
  }

  ngOnInit() {
   const token = localStorage.getItem('token');
  if (token && this.jwtHelper.isTokenExpired(token)) {
    localStorage.removeItem('token');
    alert('Sua sessão expirou. Faça login novamente.');
  }}

 onSubmit() {
  if (this.loginForm.valid) {
    const { email, senha } = this.loginForm.value;

    this.http.post(`${environment.apiUrl}/auth/login`, { email, senha }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access_token);
        const role = this.jwtHelper.decodeToken(res.access_token)?.role;

        if (role === 'professor') {
          this.router.navigate(['/teacher-dashboard']);
        } else if (role === 'aluno') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        const errorMessage = err?.error?.message || err.message || 'Credenciais inválidas';
        alert(`Erro: ${errorMessage}`);
      }
    });
  }
}
}