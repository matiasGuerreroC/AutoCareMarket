import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  productosDestacados: any[] = [];
  resenasClientes: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getProductosDestacados().subscribe(data => {
      this.productosDestacados = data;
    });

    this.apiService.getResenas().subscribe(data => {
      this.resenasClientes = data;
    });
  }
}