import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { WeatherApiService } from 'src/app/shared/services/weather-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  productosDestacados: any[] = [];
  todosLosProductos: any[] = [];
  productosRecomendados: any[] = [];
  resenasClientes: any[] = [];

  weather: any = null;
  ciudad: string = 'Santiago';

  constructor(
    private apiService: ApiService,
    private weatherApi: WeatherApiService
  ) {}

  ngOnInit() {
    // Obtener productos destacados
    this.apiService.getProductosDestacados().subscribe(data => {
      this.productosDestacados = data;
    });

    // Obtener todas las reseñas
    this.apiService.getResenas().subscribe(data => {
      this.resenasClientes = data;
    });

    // Obtener todos los productos (para recomendaciones)
    this.apiService.getProductos().subscribe(productos => {
      this.todosLosProductos = productos;
      // Luego de tener productos, intentar clasificar si ya tenemos el clima
      if (this.weather?.descripcion) {
        this.asignarRecomendaciones(this.weather.descripcion);
      }
    });

    // Obtener clima
    this.obtenerClima();
  }

  obtenerClima() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          this.weatherApi.getWeatherByCoords(lat, lon).subscribe(data => {
            if (data) {
              this.weather = data;
              this.ciudad = data.ciudad;
              this.asignarRecomendaciones(data.descripcion);
              console.log('Descripción del clima recibido:', data.descripcion);
            }
          });
        },
        (error) => {
          console.error('Error al obtener ubicación, usando Santiago por defecto:', error);
          this.weatherApi.getWeatherByCity(this.ciudad).subscribe(data => {
            if (data) {
              this.weather = data;
              this.asignarRecomendaciones(data.descripcion);
            }
          });
        }
      );
    } else {
      console.warn('Geolocalización no soportada, usando ciudad por defecto');
      this.weatherApi.getWeatherByCity(this.ciudad).subscribe(data => {
        if (data) {
          this.weather = data;
          this.asignarRecomendaciones(data.descripcion);
        }
      });
    }
  }

  asignarRecomendaciones(descripcionClima: string) {
    const desc = descripcionClima.toLowerCase();

    if (desc.includes('lluvia') || desc.includes('lluvioso')) {
      this.productosRecomendados = this.todosLosProductos.filter(p =>
        /lluvia|repelente|limpiaparabrisas/i.test(p.nombre)
      );
    } else if (desc.includes('sol') || desc.includes('calor') || desc.includes('despejado')) {
      this.productosRecomendados = this.todosLosProductos.filter(p =>
        /uv|parasol|solar/i.test(p.nombre)
      );
    } else {
      this.productosRecomendados = this.todosLosProductos.filter(p =>
        /limpieza|kit|aroma|ambientador|mantenimiento/i.test(p.nombre)
      );
    }
  }
}
