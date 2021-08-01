import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartProduct } from '../Shared/CartProduct';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = "cart";
  private cartCount = new Subject<number>();

  constructor(
    private _productService: ProductService
  ) { }

  AddToCart(prodId: number){
    let cartProd: CartProduct;
    let cartProducts: CartProduct[] = [];

    if (this.ProductIndex(prodId) > -1)
    {
      cartProducts = JSON.parse(localStorage.getItem(this.cart)!) as CartProduct[];
      cartProducts[this.ProductIndex(prodId)].Quantity++;
    } 
    else if (this.ProductIndex(prodId) == -1) 
    {
      cartProd = new CartProduct(prodId, 1);

      if (localStorage.getItem(this.cart) != null){
        cartProducts = JSON.parse(localStorage.getItem(this.cart)!) as CartProduct[];
      }

      cartProducts.push(cartProd);
    }

    localStorage.setItem(this.cart, JSON.stringify(cartProducts));
    this.UpdateCartCount();
  }

  UpdateCartCount(){
    let number = 0;
    if (localStorage.getItem(this.cart) != null)
      number = (JSON.parse(localStorage.getItem(this.cart)!) as CartProduct[]).length;
    this.cartCount.next(number);
  }

  CartCount(): Observable<number>{
    return this.cartCount.asObservable();
  }

  ProductIndex(prodId: number): number
  {
    if (localStorage.getItem(this.cart) != null){
      let cartProducts = JSON.parse(localStorage.getItem(this.cart)!) as CartProduct[];
      for (let i = 0; i < cartProducts.length; i++) {
        const element = cartProducts[i];
        if (element.Product_Id == prodId)
          return i;
      }
    }
    return -1;
  }

  DeleteProduct(prodId: number)
  {
    if (this.ProductIndex(prodId) == -1)
      return;

    let cartProducts = JSON.parse(localStorage.getItem(this.cart)!) as CartProduct[];
    for (let i = 0; i < cartProducts.length; i++) {
      const prod = cartProducts[i];
      
      if (prod.Product_Id == prodId){
        delete cartProducts[i]
        break;
      }
    }

    cartProducts = cartProducts.filter(function(el) {return el != null});
    localStorage.setItem(this.cart, JSON.stringify(cartProducts)); 
    this.UpdateCartCount();
  }

  GetCartContent(): CartProduct[]{
    if (localStorage.getItem(this.cart) == null)
      return [];
    
    return (JSON.parse(localStorage.getItem(this.cart)!) as CartProduct[]);
  }

  EmptyCart(){
    localStorage.removeItem(this.cart);
    let number = 0;
    this.cartCount.next(number);
  }
}
