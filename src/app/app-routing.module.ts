import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { ProfileComponent } from './profile/profile.component';
import { RecordedClassesComponent } from './recorded-classes/recorded-classes.component';
import { GradesComponent } from './grades/grades.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { UploadClassesComponent } from './upload-classes/upload-classes.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { TeacherGradesComponent } from './teacher-grades/teacher-grades.component';
import { AuthGuard } from './auth/auth.guard';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { PagamentoComponent } from './pagamento/pagamento.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pagamento', component: PagamentoComponent, canActivate: [AuthGuard], data: { role: 'aluno' } },
  { path: 'biblioteca', component: LibraryComponent, canActivate: [AuthGuard], data: { role: 'aluno' } },
  { path: 'area-do-aluno', component: ProfileComponent, canActivate: [AuthGuard], data: { role: 'aluno' } },
  { path: 'aulas-gravadas', component: RecordedClassesComponent, canActivate: [AuthGuard], data: { role: 'aluno' } },
  { path: 'aluno-notas', component: GradesComponent, canActivate: [AuthGuard], data: { role: 'aluno' } },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent, canActivate: [AuthGuard], data: { role: 'professor' } },
  { path: 'upload-classes', component: UploadClassesComponent, canActivate: [AuthGuard], data: { role: 'professor' } },
  { path: 'students-list', component: StudentsListComponent, canActivate: [AuthGuard], data: { role: 'professor' } },
  { path: 'teacher-grades/:id', component: TeacherGradesComponent, canActivate: [AuthGuard], data: { role: 'professor' } },
  { path: 'grade-curricular', component: CurriculumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
