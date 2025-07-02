// src/app/services/recorded-classes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AulaGravada {
  _id: string;
  nome: string;
  descricao: string;
  link: string;
  quizLink:string
  modulo: string;
  autor: string;
  categoria: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RecordedClassesService {
  private readonly API_URL = 'https://seminario-teologico-arena-backend.onrender.com/aulas-gravadas'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<AulaGravada[]> {
    return this.http.get<AulaGravada[]>(this.API_URL);
  }
}
