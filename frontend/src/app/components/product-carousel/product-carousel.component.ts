import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  standalone: false,
})
export class ProductCarouselComponent{

  @Input() productos: any[] = [];

  ngAfterViewInit() {
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      swiperEl.setAttribute('breakpoints', JSON.stringify({
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1440: { slidesPerView: 4 },
        1920: { slidesPerView: 5 }
      }));
      swiperEl.removeAttribute('init'); // Esto fuerza el init
      swiperEl.initialize();            // Y se inicializa
    }
  }
}