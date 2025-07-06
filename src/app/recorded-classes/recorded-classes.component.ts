import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AulaGravada,
  RecordedClassesService,
} from '../services/recorded-classes.service';
import { HttpClient } from '@angular/common/http';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-recorded-classes',
  templateUrl: './recorded-classes.component.html',
  styleUrls: ['./recorded-classes.component.scss'],
  standalone: true,
  imports: [FooterComponent, CommonModule, ReactiveFormsModule, FormsModule],
})
export class RecordedClassesComponent implements OnInit {
  mobileMenuOpen = false;
  isMobile = false;
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 9;

  classes: AulaGravada[] = [];
  aulasConcluidas: { [id: string]: boolean } = {};
  filteredClasses: AulaGravada[] = [];
  isLoading = true;
  moduloAtual: string = '';

  constructor(
    private recordedClassesService: RecordedClassesService,
    private http: HttpClient,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
     this.loadCheckboxProgress()
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());

    // Pega o módulo atual do aluno antes de carregar as aulas
    this.alunoService.getAlunoLogado().subscribe({
      next: (aluno) => {
        this.moduloAtual = aluno.modulo;
        this.loadClasses();
      },
      error: (err) => {
        console.error('Erro ao buscar aluno:', err);
        this.loadClasses(); // mesmo assim carrega as aulas, sem filtro de módulo
      },
    });
  }

 loadClasses(): void {
  this.isLoading = true;

  this.http.get<AulaGravada[]>('https://seminario-teologico-arena-backe-git-64c167-rickerssons-projects.vercel.app/aulas-gravadas').subscribe({
    next: (data) => {
      this.classes = data;
      console.log('Aulas recebidas:', this.classes);
      this.filterClasses();
      this.isLoading = false; // ← aqui!
    },
    error: (err) => {
      console.error(err);
      this.isLoading = false; // ← aqui também!
    },
  });
}

saveProgress(): void {
  localStorage.setItem('aulasConcluidas', JSON.stringify(this.aulasConcluidas));
}

// Carrega o progresso ao iniciar
loadCheckboxProgress(): void {
  const saved = localStorage.getItem('aulasConcluidas');
  if (saved) {
    this.aulasConcluidas = JSON.parse(saved);
  }}

  getModulosPermitidos(modulo: string): string[] {
    const ordem = [
      'Módulo 0',
      'Módulo I',
      'Módulo II',
      'Módulo III',
      'Módulo IV',
      'Módulo V',
      'Módulo VI',
    ];
    const indexAtual = ordem.indexOf(modulo);
    return indexAtual >= 0 ? ordem.slice(0, indexAtual + 1) : ordem;
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

filterClasses() {
  const normalizar = (texto: string) =>
    texto?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() || "";

  const modulosPermitidos = this.getModulosPermitidos(this.moduloAtual);
  const termo = normalizar(this.searchTerm || "");

  this.filteredClasses = this.classes.filter((lesson) => {
    const moduloNormalizado = normalizar(lesson.modulo);
    const nomeNormalizado = normalizar(lesson.nome);
    const categoriaNormalizada = normalizar(lesson.categoria || "");

    const correspondeAoModulo = modulosPermitidos.some(
      (m: string) => normalizar(m) === moduloNormalizado
    );

    const correspondeAoTermo =
      nomeNormalizado.includes(termo) ||
      categoriaNormalizada.includes(termo);

    return correspondeAoModulo && correspondeAoTermo;
  });
}


  watchLesson(url: string): void {
    window.open(url, '_blank');
  }

 onCheckboxChange(event: any, aulaId: string): void {
    
    this.aulasConcluidas[aulaId] = event.target.checked;
    
    
    localStorage.setItem('aulasConcluidas', JSON.stringify(this.aulasConcluidas));
  }

  marcarComoConcluida(id: string): void {
    this.aulasConcluidas[id] = true;
  }

  setPage(page: number): void {
    this.currentPage = page;
    // Paginação pode ser aplicada aqui futuramente
  }

  get pages(): number[] {
    const pageCount = Math.ceil(
      this.filteredClasses.length / this.itemsPerPage
    );
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}
