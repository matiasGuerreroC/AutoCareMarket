import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Necesitas ActivatedRoute para leer la URL
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false,
})
export class ProductPage implements OnInit {
  
  producto: any; // Usaremos 'any' por simplicidad, pero lo ideal es una Interfaz (ej: IProduct)
  productosRelacionados: any[] = [];
  isLoading = true; // Variable para mostrar un spinner de carga

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // 1. Obtener el ID del producto desde la URL
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      // 2. Usar el servicio para obtener los datos del producto
      this.apiService.getProductoPorId(productId).subscribe({
        next: (data) => {
          // 3. Cuando los datos llegan, los asignamos a nuestra variable
          this.producto = data;
          this.isLoading = false; // Ocultamos el spinner
          
          // Opcional: Cargar productos relacionados (puedes basarlos en la categoría del producto actual)
          this.loadRelatedProducts(); 
        },
        error: (err) => {
          console.error('Error al cargar el producto:', err);
          this.isLoading = false; // Ocultamos el spinner también en caso de error
          // Opcional: Redirigir a una página de error 404
          this.router.navigate(['/not-found']); 
        }
      });
    } else {
        // Si no hay ID, es un error, redirigimos
        console.error('No se proporcionó un ID de producto.');
        this.isLoading = false;
        this.router.navigate(['/home']);
    }
  }

  loadRelatedProducts() {
    this.apiService.getProductos().subscribe(data => {
      this.productosRelacionados = data
        .filter(p => p.id !== this.producto.id && p.categoria === this.producto.categoria)
        .slice(0, 5);
    });
  }

  
}