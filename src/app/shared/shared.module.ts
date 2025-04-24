import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterModule } from '@angular/router';

import { SectionTitleComponent } from '../components/section-title/section-title.component';
import { ProductCarouselComponent } from '../components/product-carousel/product-carousel.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ReviewCarouselComponent } from '../components/review-carousel/review-carousel.component';

import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

register(); // Registra los elementos de Swiper

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SectionTitleComponent, ProductCarouselComponent, ReviewCarouselComponent, CustomInputComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite el uso de elementos personalizados
  exports: [HeaderComponent, FooterComponent, SectionTitleComponent, ProductCarouselComponent, ReviewCarouselComponent, CustomInputComponent, ReactiveFormsModule],
})
export class SharedModule { }
