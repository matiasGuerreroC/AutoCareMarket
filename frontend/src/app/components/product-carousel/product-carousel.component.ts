import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  standalone: false,
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges {

  @Input() productos: any[] = [];

  @ViewChild('swiperEl', { static: false }) swiperElementRef!: ElementRef;

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productos'] && !changes['productos'].firstChange) {
      this.initializeSwiper();
    }
  }

  private initializeSwiper(): void {
    setTimeout(() => {
      const swiperEl = this.swiperElementRef?.nativeElement;
      if (swiperEl) {
        swiperEl.setAttribute('breakpoints', JSON.stringify({
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
          1920: { slidesPerView: 5 }
        }));
        swiperEl.removeAttribute('init');
        swiperEl.initialize();
      }
    }, 50); // Delay para asegurar que el DOM esté presente
  }
}
