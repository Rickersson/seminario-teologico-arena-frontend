import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlunoService, Aluno } from '../services/aluno.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../components/footer/footer.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
  imports: [ReactiveFormsModule, CommonModule,FooterComponent]
})
export class StudentsListComponent implements OnInit {
  mobileMenuOpen = false;
  isMobile = false;
  filterForm: FormGroup;

  students: Aluno[] = [];
  filteredStudents: Aluno[] = [];
  courses: string[] = [];

  constructor(private fb: FormBuilder, private alunoService: AlunoService, private router: Router) {
    this.filterForm = this.fb.group({
      name: [''],
      course: ['']
    });
  }

  ngOnInit(): void {
    this.checkIsMobile();
    window.addEventListener('resize', () => this.checkIsMobile());

    // Buscar alunos do backend
    this.alunoService.listarAlunos().subscribe(alunos => {
      this.students = alunos;
      this.filteredStudents = [...this.students];
      console.log(alunos)
      // Se os cursos não vêm da API, você pode criar dinamicamente:
      this.courses = [...new Set(alunos.map(a => a.modulo))];

      // Pode aplicar filtros caso já tenha valores preenchidos
      this.applyFilters(this.filterForm.value);
    });

    // Observa mudanças no formulário de filtro
    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilters(values);
    });
  }

  toggleSidebar() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  checkIsMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  applyFilters(filters: any) {
    this.filteredStudents = this.students.filter(student => {
      const nameMatch = filters.name ?
        student.nome.toLowerCase().includes(filters.name.toLowerCase()) : true;

      const courseMatch = filters.course ?
        student.modulo === filters.course : true;

      return nameMatch && courseMatch;
    });
  }

  clearFilters() {
    this.filterForm.reset();
    this.filteredStudents = [...this.students];
  }

   goToDetails(id: string) {
    this.router.navigate(['/teacher-grades', id]);
  }
}
