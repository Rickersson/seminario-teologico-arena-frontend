import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../components/footer/footer.component';
import { NgxMaskDirective } from 'ngx-mask';
import { AlunoService } from '../services/aluno.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports:[CommonModule, ReactiveFormsModule, FormsModule, FooterComponent, NgxMaskDirective]
})
export class ProfileComponent implements OnInit {
  mobileMenuOpen = false;
  isMobile = false;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private alunoService: AlunoService,private http: HttpClient) {
    this.profileForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', Validators.required, ],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required, ],
      birthdate: ['', Validators.required],
      modulo:['', Validators.required, ]
    });
  }

   ngOnInit(): void {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.loadUserData();
  }

  loadUserData(): void {
    this.alunoService.getAlunoLogado().subscribe({
      next: (aluno) => {
        this.profileForm.patchValue({
          nome: aluno.nome,
          cpf: aluno.cpf,
          email: aluno.email,
          telefone: aluno.telefone,
         birthdate: this.formatDateForInput(aluno.birthdate),
          modulo: aluno.modulo
        });
      },
      error: (err) => {
        console.error('Erro ao carregar dados do aluno:', err);
      }
    });
  }

  formatDateForInput(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // retorna "YYYY-MM-DD"
}

  toggleSidebar(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeSidebarIfMobile(): void {
    if (this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }

  checkIfMobile(): void {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }


getUserIdFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}


 onSubmit(): void {


    if (this.profileForm.valid) {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        alert('Usuário não autenticado.');
        return;
      }
      const payload = { ...this.profileForm.value };
      delete payload.modulo;

      console.log('Enviando para API:', payload);

      this.http.put(`https://seminario-teologico-arena-backend-3.vercel.app/alunos/${userId}`, payload).subscribe({
        next: () => alert('Alterações salvas com sucesso!'),
        error: (err) => {
          console.error(err);
          alert('Erro ao salvar as alterações');
        }
      });
    } else {
    console.warn('Formulário inválido:', this.profileForm.errors, this.profileForm.value);
    alert('Por favor, preencha os dados corretamente.');
  }
  }
}