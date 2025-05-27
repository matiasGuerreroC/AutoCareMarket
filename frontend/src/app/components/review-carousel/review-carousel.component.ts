import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-carousel',
  templateUrl: './review-carousel.component.html',
  styleUrls: ['./review-carousel.component.scss'],
  standalone: false,
})
export class ReviewCarouselComponent {

  @Input() resenas: any[] = [];

  ngAfterViewInit() {
    const swiperEl = document.querySelector('swiper-container.reviews-swiper');
    if (swiperEl) {
      swiperEl.setAttribute('breakpoints', JSON.stringify({
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }));
      swiperEl.setAttribute('space-between', '16');
      swiperEl.setAttribute('navigation', 'true');
      swiperEl.setAttribute('pagination', 'false');
      swiperEl.removeAttribute('init');
      (swiperEl as any).initialize();
    }
  }

}
