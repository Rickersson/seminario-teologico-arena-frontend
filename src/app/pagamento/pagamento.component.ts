import { Component } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-pagamento',
  imports: [],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.scss',
  standalone: true,
 
})
export class PagamentoComponent {
isMobile = false;
 mobileMenuOpen = false;

  toggleSidebar() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

   closeSidebarIfMobile() {
    if (this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }
}
