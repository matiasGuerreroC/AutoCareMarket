import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  productosDestacados: any[] = [];
  resenasClientes: any[] = [];

  constructor(private apiService: ApiService, private cartService: CartService) {}

  ngOnInit() {
    this.apiService.getProductosDestacados().subscribe(data => {
      this.productosDestacados = data;
    });

    this.apiService.getResenas().subscribe(data => {
      this.resenasClientes = data;
    });
  }

  agregarAlCarrito(producto: any) {
    this.cartService.addToCart(producto);
    // Opcional: muestra un mensaje de éxito
  }
}