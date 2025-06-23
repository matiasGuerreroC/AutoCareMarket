import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  standalone: false,
})
export class CartModalComponent {
  cart: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private cartService: CartService
  ) {
    this.cart = this.cartService.getCart();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  irAlCarro() {
    this.modalCtrl.dismiss();
    window.location.href = '/cart';
  }
}
