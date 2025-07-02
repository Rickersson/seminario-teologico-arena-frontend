import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno {
  _id: string;
  nome: string;
  role: string;
  cpf: string;
  telefone: string;
  email: string;
  modulo: string;
  birthdate: string;
  notaGeral: number;
  notaQuiz: number;
  pagamento: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private apiUrl = 'https://seminario-teologico-arena-backend.onrender.com/alunos';

  constructor(private http: HttpClient) {}


  listarAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }


  getAlunoLogado(): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/me`);
  }


  getAlunoById(id: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }


  updateAluno(id: string, payload: Partial<Aluno>): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/${id}`, payload);
  }
}
