import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent {
  @ViewChild('coursesSection') coursesSection!: ElementRef;

  openWhatsApp() {
    window.open('https://wa.me/+5521973443051', '_blank');
  }

  // Novo método adicionado
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('app-header')?.clientHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }
}