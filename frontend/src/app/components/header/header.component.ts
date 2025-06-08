import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  usuario: any = null; // guarda los datos del usuario logueado

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserData().subscribe(user => {
      this.usuario = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
