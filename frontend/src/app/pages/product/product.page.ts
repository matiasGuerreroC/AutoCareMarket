import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false,
})
export class ProductPage implements OnInit {
  productId: string | null = null;
  producto: any = null;
  productosRelacionados: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.apiService.getProductoPorId(this.productId).subscribe(data => {
        this.producto = data;
        this.cargarProductosRelacionados();
      });
    }
  }

  cargarProductosRelacionados() {
    this.apiService.getProductos().subscribe((productos: any[]) => {
      this.productosRelacionados = productos.filter(p => p._id !== this.productId).slice(0, 4);
    });
  }
}