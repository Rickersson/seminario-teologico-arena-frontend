import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CurriculumComponent {




  curricula = [
    { 
      title: 'Módulo I - Fundamentos', 
      description: 'Introdução aos conceitos básicos e fundamentos essenciais', 
      filePath: 'assets/modulo1.pdf',
      image: 'assets/logo-seminario-removebg-preview.png'
    },  { 
      title: 'Módulo II ', 
      description: 'Grade curricular do segundo módulo', 
      filePath: 'assets/pdfs/modulo2.pdf',
      image: 'assets/logo-seminario-removebg-preview.png'
    },  { 
      title: 'Módulo III ', 
      description: 'Grade curricular do terceiro módulo', 
      filePath: 'assets/pdfs/modulo3.pdf',
      image: 'assets/logo-seminario-removebg-preview.png'
    },
    
    { 
      title: 'Módulo IV - Especialização', 
      description: 'Foco em áreas específicas de atuação', 
      filePath: 'assets/pdfs/modulo4.pdf',
      image: 'assets/logo-seminario-removebg-preview.png'
    },  { 
      title: 'Módulo V', 
      description: 'Grade curricular do quinto módulo', 
      filePath: 'assets/pdfs/modulo5.pdf',
      image: 'assets/logo-seminario-removebg-preview.png'
    },
    { 
      title: 'Módulo VI - Final', 
      description: 'Grade curricular do sexto módulo', 
      filePath: 'assets/pdfs/modulo6.pdf',
      image: 'assets/logo-seminario-removebg-preview.png'
    }
   
  ];

downloadPdf(filePath: string): void {
  const link = document.createElement('a');
  link.href = filePath;
  link.download = filePath.split('/').pop() || 'download.pdf';
  link.click();
}
}