import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { CheckOutService } from '../Services/check-out.service';
import { ProductService } from '../Services/product.service';
import { CartProduct } from '../Shared/CartProduct';
import { CheckOutForm } from '../Shared/CheckOutForm';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  Order: CheckOutForm;
  Products: CartProduct[];
  set cartCount(value: number) {
    this._cartCount = value;
    this.cartContent = this._cartService.GetCartContent();
    this.UpdateTotal();
  }

  get cartCount() {
    return this._cartCount;
  }

  private _cartCount: number = 0;
  cartContent: CartProduct[] = [];
  total: number = 0;
  checkFrm: CheckOutForm;
  constructor(
    private _cartService: CartService,
    private _productService: ProductService,
    private _checkOutService: CheckOutService,
    private _router: Router,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    this._cartService.CartCount().subscribe((d) => (this.cartCount = d));
    this._cartService.UpdateCartCount();
    this.cartContent = this._cartService.GetCartContent();
    
  }

  UpdateTotal(): void {
    this.total = 0;
    for (let i = 0; i < this.cartContent.length; i++) {
      const prod = this.cartContent[i];
      this._productService
        .GetProductById(prod.Product_Id)
        .subscribe((d) => (this.total += d.Offer_Price * prod.Quantity));
    }
  }
  url: string = 'http://localhost:9602/api/CheckOut';

  onSubmit(data: CheckOutForm) {
    data.Products = this.cartContent;
  
    if (localStorage.getItem('userId') != null)
      data.User_Id = localStorage.getItem('userId')!;
    else
      this._router.navigate(['/login'])
    console.log(data);
    
    this._checkOutService.PostOrder(data).subscribe(
      (data) => this._router.navigate(['/homePage']),
      (err) => console.log(err),
      
    );

    // this._http.post(this.url,data).subscribe((result)=>{console.warn(result)})
  }
 
}
