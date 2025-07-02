import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  isTransparent = true;
  mobileMenuOpen = false;
  academicMenuOpen = false;

  constructor(private navbarService: NavbarService,private el: ElementRef) { }

  ngOnInit(): void {
    this.navbarService.currentNavbarState.subscribe(state => {
      this.isTransparent = state;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 50) {
      this.navbarService.changeNavbarState(false);
    } else {
      this.navbarService.changeNavbarState(true);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleAcademicMenu() {
    this.academicMenuOpen = !this.academicMenuOpen;
  }

   scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = this.el.nativeElement.offsetHeight;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    this.mobileMenuOpen = false;
  }

  // Adicionar referência ao elemento
  
}