import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { LoginService } from 'src/app/Services/login.service';
import { ProductService } from 'src/app/Services/product.service';
import { CartProduct } from 'src/app/Shared/CartProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  isRegistered: boolean;
  
  set cartCount(value: number) { 
    this._cartCount = value;
    this.cartContent = this._cartService.GetCartContent();
    this.UpdateTotal();
  }

  get cartCount() {return this._cartCount}

  private _cartCount: number = 0;
  cartContent: CartProduct[] =[];
  total: number = 0;
  constructor(
    private _cartService: CartService,
    private _productService: ProductService,
    private _loginService: LoginService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._cartService.CartCount().subscribe(d => this.cartCount = d);
    this._cartService.UpdateCartCount();
    this.cartContent = this._cartService.GetCartContent();
    this._loginService.currentMessage2.subscribe(
      d => {
        if (localStorage.getItem("userId") != null)
          this.isRegistered = true;
        else
          this.isRegistered = false;
      }
    )
  }

  UpdateTotal(): void{
    this.total = 0;
    for (let i = 0; i < this.cartContent.length; i++) {
      const prod = this.cartContent[i];
      this._productService.GetProductById(prod.Product_Id).subscribe(d => this.total+= d.Offer_Price*prod.Quantity)
    }


  }

  GoToChechOut(){
    if (localStorage.getItem("userId") != null){
      this._router.navigate(['/homePage/CheckOut'])
    }
    else {
      this._router.navigate(['/login'])
    }
  }
}
