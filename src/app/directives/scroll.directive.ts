import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appScroll]',
    standalone: false
})
export class ScrollDirective {
  constructor(private el: ElementRef) { }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    const targetId = this.el.nativeElement.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('app-header')?.clientHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}