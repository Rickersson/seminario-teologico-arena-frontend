//src/app/teacher-dashboard/teacher-dashboard.ts(ts para o professor salvar ebooks)

import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms'; 
import { environment } from 'src/enviroments/enviroment';
import { Module } from '../enums/module.enum';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
    selector: 'app-teacher-dashboard',
    templateUrl: './teacher-dashboard.component.html',
    styleUrls: ['./teacher-dashboard.component.scss'],
    standalone:true,
    imports: [CommonModule, ReactiveFormsModule, FooterComponent]
})
export class TeacherDashboardComponent implements OnInit {
  Module = Module;
  private readonly API_URL = environment.apiUrl; 

 
  mobileMenuOpen = false;
  isMobile = false;
  uploading = false;
  coverPreview: string | null = null;
  fileName: string | null = null;
  
  ebookForm: FormGroup;
private fb = inject(FormBuilder);
 private http = inject(HttpClient )
 constructor(
  
  
) {
  this.ebookForm = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(5)]],
  author: ['', [Validators.required]],
  category: ['', [Validators.required]],
  description: ['', [Validators.required, Validators.minLength(20)]],
  modulo: ['', [Validators.required]],
  cover: [null],
   file: [null, [Validators.required]]
});
}
  ngOnInit(): void {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  toggleSidebar(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  checkIfMobile(): void {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }

  onCoverChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Atualiza o formulário
      this.ebookForm.patchValue({ cover: file });
      
      // Pré-visualização da imagem
      const reader = new FileReader();
      reader.onload = () => {
        this.coverPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

onFileChange(event: any): void {
  const file = event.target.files[0];
  const allowedTypes = ['application/pdf', 'application/epub+zip', 'application/x-mobipocket-ebook', 'text/plain'];
  
  if (file) {
    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de arquivo inválido. Use PDF, EPUB, MOBI ou TXT.');
      event.target.value = null;
      this.ebookForm.patchValue({ file: null });
      return;
    }

    if (file.size > 8 * 1024 * 1024) { // 8MB
      alert('O arquivo não pode ultrapassar 8MB.');
      event.target.value = null;
      this.ebookForm.patchValue({ file: null });
      return;
    }

    this.ebookForm.patchValue({ file });
    this.fileName = file.name;
  }
}


  
onSubmit(): void {
  this.ebookForm.markAllAsTouched();

  if (this.ebookForm.valid) {
    const formData = new FormData();
    
    formData.append('nome', this.ebookForm.get('title')?.value);
    formData.append('modulo', this.ebookForm.get('modulo')?.value);
    formData.append('autor', this.ebookForm.get('author')?.value);
    formData.append('categoria', this.ebookForm.get('category')?.value);
    formData.append('descricao', this.ebookForm.get('description')?.value);

    const file = this.ebookForm.get('file')?.value;
    if (file) {
      formData.append('file', file);
    }

    this.http.post(`${this.API_URL}/ebooks/upload`, formData)
      .subscribe({
        next: () => {
          this.ebookForm.reset();
          alert('E-book enviado com sucesso!');
        },
        error: (err) => {
          alert(`Erro ao enviar e-book: ${err.message}`);
        }
      });
  } else {
    alert('Por favor, preencha todos os campos obrigatórios corretamente.');
  }
}
}

