import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Shared/Product';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {


  @Input() 
  get Product_Id(): number { return this._productId; }
  set Product_Id(value: number){
    this._productId = value;
    this._productService.GetProductById(this.Product_Id).subscribe(d => this.product = d);
  }
  _productId!: number;
  product!: Product;

  @Input() Quantity?: number

  constructor(
    private _productService: ProductService,
    private _cartService: CartService
  ) { }

  ngOnInit(): void {    
  }

  DeleteFromCart(){
    this._cartService.DeleteProduct(this.Product_Id);
  }

}
