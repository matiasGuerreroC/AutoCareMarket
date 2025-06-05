import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string | null = null;

  // NUEVAS PROPIEDADES PARA EL MÉTODO login()
  email!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {}

  submit() {
    this.errorMessage = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    const credentials = this.form.value;

    this.authService.login(credentials as any).subscribe({
      next: (res) => {
        console.log('Inicio de sesión exitoso:', res);
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      error: (err: Error) => {
        console.error('Error al iniciar sesión:', err);
        this.errorMessage = err.message || 'Error desconocido al iniciar sesión.';
      }
    });
  }

  // NUEVO MÉTODO login()
  async login() {
    if (!this.email || !this.password) {
      this.presentAlert('Error', 'Por favor, introduce tu email y contraseña.');
      return;
    }

    console.log('Frontend: Intentando login con email:', this.email);
    console.log('Frontend: Contraseña que se envía (texto plano):', this.password);

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        loading.dismiss();
        console.log('Login exitoso:', res);
        this.router.navigateByUrl('/home');
      },
      error: async (err) => {
        loading.dismiss();
        console.error('Error de login:', err);
        this.presentAlert('Error de inicio de sesión', err.message || 'Credenciales inválidas. Inténtalo de nuevo.');
      }
    });
  }

  // Método auxiliar para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
