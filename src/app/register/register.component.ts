import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, ReactiveFormsModule,NgxMaskDirective]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email,]],
      telefone: ['', [Validators.required, Validators.maxLength(11)]],
      birthdate: ['', [Validators.required,]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
  });
  }

  passwordMatchValidator(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return senha === confirmPassword ? null : { mismatch: true };
  }

onSubmit() {
 

  const { confirmPassword, ...formData } = this.registerForm.value;

  this.http.post(`${environment.apiUrl}/alunos`, formData).subscribe({
    next: () => {
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      const errorMessage =
        err?.error?.message ||
        err.message ||
        'Erro ao cadastrar usuário';

      alert(`Erro: ${errorMessage}`);
    }
  });
}}