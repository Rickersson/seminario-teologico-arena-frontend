import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../components/footer/footer.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-class',
  templateUrl: './upload-classes.component.html',
  styleUrls: ['./upload-classes.component.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent, ReactiveFormsModule]
})
export class UploadClassesComponent implements OnInit {
  classForm: FormGroup;
  mobileMenuOpen = false;
  isMobile = false;
  uploading = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.classForm = this.fb.group({
      nome: ['', Validators.required],
      modulo: ['', Validators.required],
      descricao: ['', Validators.required],
      autor:['', Validators.required],
      link: ['', Validators.required],
      categoria: ['', Validators.required],
      quizLink: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkIsMobile();
    window.addEventListener('resize', () => this.checkIsMobile());
  }

  toggleSidebar() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  checkIsMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  onSubmit() {

    console.log(this.classForm.value)

    if (this.classForm.valid) {
      this.uploading = true;

   const payload = this.classForm.value;

      this.http.post('http://localhost:3000/aulas-gravadas', payload).subscribe({
        next: () => {
          this.uploading = false;
          alert('Aula enviada com sucesso!');
          this.classForm.reset();
        },
        error: (err) => {
          this.uploading = false;
          alert('Erro ao enviar aula');
          console.error(err);
        }
      });
    }
  }
}
