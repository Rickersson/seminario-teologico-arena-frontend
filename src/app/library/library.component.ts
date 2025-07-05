import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../components/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { Ebook, EbooksService } from '../services/ebooks.service';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, FormsModule],
})
export class LibraryComponent implements OnInit {
  ebooks: Ebook[] = [];
  filteredEbooks: Ebook[] = [];
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 6;
  pages: number[] = [];
  academicMenuOpen = false;
  mobileMenuOpen = false;
  isMobile = false;
  isScrolled = false;
  isLoading = true;
  isTransparent = false;
  moduloAtual = '';

  constructor(
    private ebooksService: EbooksService,
    private HttpClient: HttpClient,
    private el: ElementRef,
    private alunoService: AlunoService 
  ) {}

  ngOnInit() {
    this.checkMobile(); 
    
    this.alunoService.getAlunoLogado().subscribe({
    
    next: (aluno) => {
      this.moduloAtual = aluno.modulo;
      this.loadEbooks(); 
    },
    error: (err) => {
      console.error('Erro ao buscar aluno:', err);
      this.loadEbooks(); 
    }
  });
   
  }

  loadEbooks() {
    this.ebooksService.getAll().subscribe({
      next: (data) => {
        this.ebooks = data;
        this.filteredEbooks = data;
        this.filterEbooks();
        this.calculatePages();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  

  filterEbooks() {
    const modulosPermitidos = this.getModulosPermitidos(this.moduloAtual);

    if (!this.searchTerm) {
      this.filteredEbooks = this.ebooks.filter((e) =>
        modulosPermitidos.includes(e.modulo)
      );
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredEbooks = this.ebooks.filter(
        (e) =>
          (e.nome.toLowerCase().includes(term) ||
            e.autor.toLowerCase().includes(term) ||
            e.categoria.toLowerCase().includes(term)) &&
          modulosPermitidos.includes(e.modulo)
      );
    }

    this.currentPage = 1;
    this.calculatePages();
  }

  getModulosPermitidos(modulo: string): string[] {
    const ordem = [
      'Módulo I',
      'Módulo II',
      'Módulo III',
      'Módulo IV',
      'Módulo V',
      'Módulo VI',
    ];
    const indexAtual = ordem.indexOf(modulo);
    return ordem.slice(0, indexAtual + 1);
  }

  calculatePages() {
    const pageCount = Math.ceil(this.filteredEbooks.length / this.itemsPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  get paginatedEbooks() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEbooks.slice(start, start + this.itemsPerPage);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
    // Mantém a transparência apenas no topo da página
    this.isTransparent = window.scrollY === 0;

    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 0;

    // Controlar transparência apenas no topo da página
    this.isTransparent = scrollPosition < 50; // Ajuste conforme necessá
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobile();
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }

  toggleSidebar() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeSidebarIfMobile() {
    if (this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }

  downloadEbook(base64Content: string, nomeArquivo: string = 'ebook.pdf') {
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    // Detectar tipo do arquivo pela extensão (se desejar mais tarde)
    const blob = new Blob([byteArray], { type: 'application/pdf' }); // você pode trocar aqui se tiver EPUB, MOBI, etc.

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = nomeArquivo;
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 10000); // limpeza
  }

  previewEbook(base64Content: string) {
    // Se quiser, pode definir o tipo MIME padrão, ex: pdf
    const mimeType = 'application/pdf';

    // Converter base64 para blob
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Criar URL e abrir em nova aba
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');

    // Opcional: liberar a URL depois de algum tempo
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = this.el.nativeElement.offsetHeight;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleAcademicMenu() {
    this.academicMenuOpen = !this.academicMenuOpen;
  }

   makeQuiz(url: string): void {
    window.open(url, '_blank');
  }
}
