import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private transparentNavbar = new BehaviorSubject<boolean>(true);
  currentNavbarState = this.transparentNavbar.asObservable();

  constructor() { }

  changeNavbarState(state: boolean) {
    this.transparentNavbar.next(state);
  }
}