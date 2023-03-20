import { Component } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent {
  title = 'carruselPrueba';
  startX : number | null = 0;

  items = [
    {
      imageUrl: '../assets/images/1.jpg',
      altText: 'Image 1'
    },
    {
      imageUrl: '../assets/images/2.jpg',
      altText: 'Image 2'
    },
    {
      imageUrl: '../assets/images/3.jpg',
      altText: 'Image 3'
    },{
      imageUrl: '../assets/images/4.jpg',
      altText: 'Image 1'
    },
    {
      imageUrl: '../assets/images/5.jpg',
      altText: 'Image 2'
    },
    {
      imageUrl: '../assets/images/6.jpg',
      altText: 'Image 3'
    }
  ];

  onPrevButtonClick(event: MouseEvent) {
    const btn = event.currentTarget as HTMLButtonElement;
    const carruselList = btn.parentNode as HTMLElement;
    const track = carruselList.querySelector('#track') as HTMLElement;
    const carrusel = track.querySelectorAll('.carrusel');
    const carruselWidth = (carrusel[0] as HTMLElement).offsetWidth;
    
    let leftPosition = 0;
    if (track.style.left !== '') {
      leftPosition = parseFloat(track.style.left.slice(0, -2)) * -1;
    }
    if (btn.dataset['button'] === 'button-prev' && leftPosition > 0) {
      track.style.left = `${-1 * (leftPosition - carruselWidth)}px`;
    }
  }

  onNextButtonClick(event: MouseEvent) {
    const btn = event.currentTarget as HTMLButtonElement;
    const carruselList = btn.parentNode as HTMLElement;
    const track = carruselList.querySelector('#track') as HTMLElement;
    const carrusel = track.querySelectorAll('.carrusel');
    const carruselWidth = (carrusel[0] as HTMLElement).offsetWidth;
    const trackWidth = track.offsetWidth;
    const listWidth = carruselList.offsetWidth;
    let leftPosition = 0;
    if (track.style.left !== '') {
      leftPosition = parseFloat(track.style.left.slice(0, -2)) * -1;
    }
    if (btn.dataset['button'] === 'button-next' && leftPosition < (trackWidth - listWidth)) {
      track.style.left = `${-1 * (leftPosition + carruselWidth)}px`;
    }
  }

  onTouchStart(event: TouchEvent) {
    const touch = event.touches[0] || event.changedTouches[0];
    this.startX = touch.pageX;
    const carruselList = (event.target as HTMLElement).parentNode as HTMLElement;
  }
  
  onTouchMove(event: TouchEvent) {
    if (!this.startX) {
      return;
    }
  
    const moveX = event.touches[0].clientX - this.startX;
    const currentTarget = event.currentTarget as HTMLElement;
    if (!currentTarget) {
      return;
    }
    
    const parent = currentTarget.parentNode as HTMLElement;
    if (!parent) {
      return;
    }
    
    const track = parent.querySelector('#track') as HTMLElement;
    if (!track) {
      return;
    }
  
    const leftPosition = track.style.left ? parseFloat(track.style.left.slice(0, -2)) : 0;
    const carruselWidth = track.querySelector('.carrusel')?.clientWidth || 0;
    const trackWidth = track.clientWidth || 0;
    const listWidth = currentTarget.clientWidth || 0;
  
    if (moveX > 0 && leftPosition < 0) {
      track.style.left = `${leftPosition + 25}px`;
      this.startX = event.touches[0].clientX;
    } else if (moveX < 0 && leftPosition > -(trackWidth - listWidth)) {
      track.style.left = `${leftPosition - 25}px`;
      this.startX = event.touches[0].clientX;
    }
  }
  
  onTouchEnd() {
    this.startX = null;
  }

}
