import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: false,
})
export class AboutPage {
  private map: any;

  constructor(private alertController: AlertController) {}

  ionViewDidEnter() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-33.0472, -71.6127], 13); // Valparaíso
    
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);

    // Agrega capa y marcador después
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([-33.0472, -71.6127])
      .addTo(this.map)
      .bindPopup('AutoCare Market - Sucursal Valparaíso')
      .openPopup();
  }

  async onSubmit() {
    const alert = await this.alertController.create({
      header: 'Mensaje enviado',
      message: 'Tu mensaje ha sido enviado correctamente. ¡Gracias por contactarnos!',
      buttons: ['OK']
    });
    await alert.present();
  }
}
