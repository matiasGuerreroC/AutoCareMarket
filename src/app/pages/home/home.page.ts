import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  productosDestacados = [
    {
      nombre: 'Shampoo para Autos',
      descripcion: 'Limpieza profunda y brillo instantáneo.',
      precio: 8500,
      imagen: 'assets/productos/shampoo.png'
    },
    {
      nombre: 'Aspiradora portátil',
      descripcion: 'Compacta y poderosa para interior del auto.',
      precio: 18990,
      imagen: 'assets/productos/aspiradora.png'
    },
    {
      nombre: 'Paño de microfibra',
      descripcion: 'Suave, absorbente y sin rayas.',
      precio: 2990,
      imagen: 'assets/productos/pano.png'
    },
    {
      nombre: 'Cera para autos',
      descripcion: 'Brillo duradero y protección UV.',
      precio: 4500,
      imagen: 'assets/productos/cera.png'
    },
    {
      nombre: 'Limpiador de llantas',
      descripcion: 'Elimina suciedad y grasa.',
      precio: 3500,
      imagen: 'assets/productos/limpiador.png'
    }
  ];
}
