import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FooterComponent } from '../components/footer/footer.component';
import { NgxMaskDirective } from 'ngx-mask';
import { Aluno, AlunoService } from '../services/aluno.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './teacher-grades.component.html',
  styleUrls: ['./teacher-grades.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FooterComponent,
    NgxMaskDirective,
  ],
})
export class TeacherGradesComponent implements OnInit {
  mobileMenuOpen = false;
  isMobile = false;
  profileForm: FormGroup;
   studentId!: string;
  aluno!: Aluno;

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private http: HttpClient, private route: ActivatedRoute,
  ) {
    this.profileForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      birthdate: ['', Validators.required],
      modulo: ['', Validators.required],
      notaGeral: ['', Validators.required],
      notaQuiz: ['', Validators.required],
      pagamento:['',Validators.required]
    });
  }

  ngOnInit(): void {
   // pega o :id da URL
    this.studentId = this.route.snapshot.paramMap.get('id')!;
    // carrega os dados
    this.alunoService.getAlunoById(this.studentId).subscribe({
      next: aluno => {
        this.aluno = aluno;
        // dispara patchValue no form com aluno e notas
        this.profileForm.patchValue({
          nome: aluno.nome,
          cpf: aluno.cpf,
          email: aluno.email,
          telefone: aluno.telefone,
          birthdate: this.formatDateForInput(aluno.birthdate),
          modulo: aluno.modulo,
          notaGeral: aluno.notaGeral,
          notaQuiz: aluno.notaQuiz
        });
      },
      error: err => console.error(err)
    });



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
        modulo: aluno.modulo,
        pagamento: aluno.pagamento
      });
    },
    error: (err) => {
      console.error('Erro ao carregar dados do aluno:', err);
    },
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
  if (!this.profileForm.valid) {
    alert('Por favor, preencha os dados corretamente.');
    return;
  }

  const studentId = this.route.snapshot.paramMap.get('id');
  if (!studentId) {
    alert('ID do aluno não encontrado na rota.');
    return;
  }

  // Extrai somente os campos que podem ser atualizados
  const fv = this.profileForm.value;
  const payload = {
    notaGeral: fv.notaGeral,
    notaQuiz: fv.notaQuiz,
    modulo: fv.modulo,
    pagamento: fv.pagamento
  };

  console.log('Enviando para API:', payload);
  this.alunoService.updateAluno(studentId, payload).subscribe({
    next: () => alert('Alterações salvas com sucesso!'),
    error: err => {
      console.error(err);
      alert('Erro ao salvar as alterações');
    }
  });}}
