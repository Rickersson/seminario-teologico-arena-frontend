import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
@Injectable({ providedIn: 'root' })
export class AuthService {
  private helper = new JwtHelperService();
  private authStateSubject = new BehaviorSubject<{
    isLogged: boolean;
    role: 'aluno' | 'professor' | null;
  }>({ isLogged: false, role: null });

  authState$ = this.authStateSubject.asObservable();

  constructor() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    const token = localStorage.getItem('token');
    const isLogged = token ? !this.helper.isTokenExpired(token) : false;
    let role: 'aluno' | 'professor' | null = null;

    if (isLogged && token) {
      try {
        const decoded: any = this.helper.decodeToken(token);
        role = decoded.role || null;
        console.log('Token decodificado:', decoded); // Debug
      } catch (e) {
        console.error('Erro ao decodificar token:', e);
        role = null;
      }
    }

    this.authStateSubject.next({ isLogged, role });
  }

   getAuthState() {
    return this.authStateSubject.asObservable();
  }

  get isAuthenticated(): boolean {
    return this.authStateSubject.getValue().isLogged;
  }

  get getUserRole(): 'aluno' | 'professor' | null {
    return this.authStateSubject.getValue().role;
  }

  get isAluno(): boolean {
    return this.getUserRole === 'aluno';
  }

  get isProfessor(): boolean {
    return this.getUserRole === 'professor';
  }

  logout() {
    localStorage.removeItem('token');
    this.authStateSubject.next({ isLogged: false, role: null });
  }
}