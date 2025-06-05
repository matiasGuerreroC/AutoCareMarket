import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from'../../shared/services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  username!: string;
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  documentType!: string;
  phone!: string;
  documentNumber!: string; // <-- AGREGA ESTA LÍNEA

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async register() {
    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
    });
    await loading.present();

    this.authService
      .register(
        this.username,
        this.email,
        this.password,
        this.firstName, // <-- PASA ESTOS CAMPOS ADICIONALES
        this.lastName,
        this.documentType,
        // this.documentNumber, // Si lo usas
        this.phone
      )
      .subscribe({
        next: async (res: any) => {
          loading.dismiss();
          console.log('Registro exitoso:', res);
          await this.presentAlert(
            'Registro Exitoso',
            'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.'
          );
          this.router.navigateByUrl('/login');
        },
        error: async (err: any) => {
          loading.dismiss();
          console.error('Error de registro:', err);
          let errorMessage = 'Error al registrar el usuario. Inténtalo de nuevo.';
          if (err.message) {
            errorMessage = err.message;
          }
          await this.presentAlert('Error de Registro', errorMessage);
        },
      });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
