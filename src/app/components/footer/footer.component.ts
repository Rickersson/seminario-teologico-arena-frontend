import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
     standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
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
}
