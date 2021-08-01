import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { Product } from 'src/app/Shared/Product';
import { Rating } from 'src/app/Shared/Rating';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  flagAlreadyAdded: boolean = false;
  result: any;
  ClassRed: boolean = false;
  userid=localStorage.getItem("userId");

  @Input() hidden: boolean;
  //userid = '123';
  @Input() product!: Product;
  constructor(
    private _router: Router,
    private _wishListService: WishlistService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    if (this.userid == null) {
      this.flagAlreadyAdded = true;
    } else {
      this._wishListService
        .CheckIfWishListExistForThisUserAndProduct(this.userid, this.product.Id)
        .subscribe((data) => {
          if (data) {
            this.ClassRed = true;
          } else this.ClassRed = false;
        });
    }
  }



  GetAvgRating(ratings: Rating[]): Number {
    let sum = 0;
    if (ratings == null || ratings.length == 0) return sum;

    ratings.forEach((rate) => {
      sum += rate.Rate;
    });

    return sum / ratings.length;
  }

  GoToDetails(): void {
    let url = '/homePage/details/' + this.product.Id;
    this._router.navigate([url]);
  }
  AddToWishList(product: Product) {
    if (this.userid != null) {
      if (this.ClassRed) {
        this._wishListService
          .DeleteWishList(this.userid!, product.Id)
          .subscribe((data) => {
            this.ClassRed = false;
            this._wishListService.changeMessage('');
           
          });
      } else {
        this._wishListService
          .AddToWishList(this.userid!, product.Id)
          .subscribe((data) => {
            this.result = data;
            this.ClassRed = true;
            this._wishListService.changeMessage('');
            
          });
      }
    }
  }

  AddToCart(){
    this._cartService.AddToCart(this.product.Id);
  }
}
