import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-pagamento',
  imports: [],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.scss',
  standalone: true,
})
export class PagamentoComponent implements OnInit {
  isMobile = false;
  mobileMenuOpen = false;

  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeSidebarIfMobile() {
    if (this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }
}
