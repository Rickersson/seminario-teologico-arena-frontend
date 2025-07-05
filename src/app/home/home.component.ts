import { Component, HostListener } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent {
  isTransparent = true;
  mobileMenuOpen = false;
  academicMenuOpen = false;
  
  aboutMenuOpen = false;

  auth$ = this.authService.authState$;

  constructor(
    private navbarService: NavbarService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.navbarService.currentNavbarState.subscribe(state => {
      this.isTransparent = state;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
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
    this.academicMenuOpen = false;
  }

  toggleAcademicMenu() {
    this.academicMenuOpen = !this.academicMenuOpen;
  }

  toggleAboutMenu(): void {
  this.aboutMenuOpen = !this.aboutMenuOpen;
}

downloadFile(fileUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  link.target = '_blank'; // opcional, mas ajuda em alguns navegadores
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

downloadPdf() {
  this.downloadFile('assets/pdfs/sobre_nos.pdf', 'sobre_nos.pdf');
}

  openWhatsApp() {
    window.open(
      'https://wa.me/+5521980996928?text=Gostaria+de+saber+mais+sobre+o+seminário+teológico+arena.',
      '_blank'
    );
  }

  scrollToSection(sectionId: string) {
    const navEl = document.querySelector('nav');
    const headerHeight = navEl ? (navEl as HTMLElement).clientHeight : 0;

    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
    }

    this.mobileMenuOpen = false;
  }
}
