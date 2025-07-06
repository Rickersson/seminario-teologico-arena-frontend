import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://seminario-teologico-arena-backe-git-64c167-rickerssons-projects.vercel.app/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(this.apiUrl, { email, senha });
  }
}