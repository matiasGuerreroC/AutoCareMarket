import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: false,
})
export class AboutPage implements OnInit {

  constructor(private alertController: AlertController) {}

  ngOnInit() {
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
