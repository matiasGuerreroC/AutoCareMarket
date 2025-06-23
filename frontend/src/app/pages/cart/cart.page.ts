import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  cart: any[] = [];
  orderId: string = '17494015';
  deliveryMethod: string = 'retiro';
  shippingAddress: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.loadCart();
  }

  ionViewWillEnter() {
    this.cart = this.cartService.loadCart();
  }

  increaseQty(item: any) {
    this.cartService.updateQty(item, item.qty + 1);
    this.cart = this.cartService.getCart();
  }

  decreaseQty(item: any) {
    this.cartService.updateQty(item, item.qty - 1);
    this.cart = this.cartService.getCart();
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item);
    this.cart = this.cartService.getCart();
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.precio * item.qty, 0);
  }

  checkout() {
    alert('¡Compra realizada!');
    this.cartService.clearCart();
    this.cart = [];
  }
}
