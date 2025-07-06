// src/app/services/ebooks.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Ebook {
  _id: string;
  nome: string;
  autor: string;
  categoria: string;
  modulo:string;
  content: string;
   quizLink:string
}

@Injectable({
  providedIn: 'root'
})
export class EbooksService {
  private baseUrl = 'https://seminario-teologico-arena-backe-git-64c167-rickerssons-projects.vercel.app/ebooks'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ebook[]> {
    return this.http.get<Ebook[]>(this.baseUrl);
  }
}
