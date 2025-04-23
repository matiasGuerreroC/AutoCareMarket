import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SectionTitleComponent } from '../components/section-title/section-title.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, SectionTitleComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [HeaderComponent, FooterComponent, SectionTitleComponent],
})
export class SharedModule { }
