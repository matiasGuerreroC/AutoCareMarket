import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: any[] = [];

  addToCart(producto: any) {
    const found = this.cart.find(item => item._id === producto._id);
    if (found) {
      found.qty += 1;
    } else {
      this.cart.push({ ...producto, qty: 1 });
    }
    this.saveCart();
  }

  updateQty(item: any, qty: number) {
    const found = this.cart.find(p => p._id === item._id);
    if (found) {
      found.qty = Math.max(1, qty);
      this.saveCart();
    }
  }

  removeFromCart(item: any) {
    this.cart = this.cart.filter(p => p._id !== item._id);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getCart() {
    return this.cart;
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return this.cart;
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}