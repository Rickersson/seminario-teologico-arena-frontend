import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token');

    if (!token) {
      return this.router.createUrlTree(['/login']);
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role;

    const expectedRole = route.data['role'];

    if (expectedRole && role !== expectedRole) {
      return this.router.createUrlTree(['/login']);
    }

    return true;
  }
}
