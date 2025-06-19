import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CarsApiService } from 'src/app/shared/services/cars-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  productosDestacados: any[] = [];
  resenasClientes: any[] = [];

  // Campos para la API externa
  marca: string = '';
  modelo: string = '';
  resultadosAutos: any[] = [];
  cargandoAutos: boolean = false;
  errorAutos: string = '';

  constructor(private apiService: ApiService, private carsApiService: CarsApiService) {}

  ngOnInit() {
    this.apiService.getProductosDestacados().subscribe(data => {
      this.productosDestacados = data;
    });

    this.apiService.getResenas().subscribe(data => {
      this.resenasClientes = data;
    });
  }

  buscarAutos() {
    if (!this.marca.trim()) {
      this.errorAutos = 'Ingresa una marca válida.';
      return;
    }

    this.cargandoAutos = true;
    this.errorAutos = '';
    this.resultadosAutos = [];

    this.carsApiService.getCars(this.marca, this.modelo).subscribe({
      next: (data) => {
        this.resultadosAutos = data;
        this.cargandoAutos = false;
      },
      error: (err) => {
        this.errorAutos = 'Error al consultar la API de autos.';
        this.cargandoAutos = false;
        console.error(err);
      }
    });
  }
}