import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scroll-hide]'
})
export class ScrollHideDirective {

  private isVisible = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event :any) {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const elHeight = this.el.nativeElement.offsetHeight;
    const windowHeight = window.innerHeight;

    if (scrollPosition > elHeight - windowHeight && this.isVisible) {
      this.isVisible = false;
      this.renderer.setStyle(this.el.nativeElement.querySelector('.alert'), 'display', 'none');
      this.renderer.setStyle(this.el.nativeElement.querySelector('.btn-age'), 'display', 'none');
    } else if (scrollPosition <= elHeight - windowHeight && !this.isVisible) {
      this.isVisible = true;
      this.renderer.setStyle(this.el.nativeElement.querySelector('.alert'), 'display', 'block');
      this.renderer.setStyle(this.el.nativeElement.querySelector('.btn-age'), 'display', 'flex');
    }
  }
  

}
