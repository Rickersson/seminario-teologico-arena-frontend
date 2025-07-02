import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../components/footer/footer.component';
import { AlunoService } from '../services/aluno.service'; // ajuste o caminho se necessário
import { Aluno } from '../services/aluno.service'; // ajuste se o modelo estiver em outro lugar

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FooterComponent]
})
export class GradesComponent implements OnInit {
  mobileMenuOpen = false;
  isMobile = false;

  quizScore = 0;       // Nota dos quizzes convertida para %
  overallScore = 0;    // Nota geral convertida para %

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());

    // Carregar notas do aluno logado
    this.alunoService.getAlunoLogado().subscribe({
      next: (aluno: Aluno) => {
        this.quizScore = Math.round((aluno.notaQuiz || 0) * 10);
        this.overallScore = Math.round((aluno.notaGeral || 0) * 10);
      },
      error: (err) => {
        console.error('Erro ao carregar notas do aluno:', err);
      }
    });
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
}
