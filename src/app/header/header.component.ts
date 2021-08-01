import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { ProductService } from '../Services/product.service';
import { SubCategoryNavBarService } from '../Services/sub-category-nav-bar.service';
import { WishlistService } from '../Services/wishlist.service';
import { SubCategoryForVanBar } from '../Shared/SubCategoryForNavBar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  subCats: SubCategoryForVanBar[] = [];

  subId: number = 0;
  searchTerm: string = '';
  wishListCount = 0;
  cartCount: number = 0;

  userid=localStorage.getItem("userId");
 
  constructor(
    private _subCatService: SubCategoryNavBarService,
    private _productService: ProductService,
    private _wishListService: WishlistService,
    private _router: Router,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this._cartService.CartCount().subscribe(d => this.cartCount = d);
    this._cartService.UpdateCartCount();
    

    this._subCatService.GetSubWithChild().subscribe((d) => (this.subCats = d));

    if (this.userid != null) {
      this._wishListService
        .GetWishListForThisUser(this.userid)
        .subscribe((data) => {
          this.wishListCount = data.length;
        });
    }

    
    if (this.userid != null) {
      this._wishListService.currentMessage.subscribe((message) => {
        this._wishListService
          .GetWishListForThisUser(this.userid!)
          .subscribe((data) => {
            console.log(data)
            this.wishListCount = data.length;
          });
      });
    }
  }

  Search(): void {
    let url = '/homePage/search/' + this.subId + '/' + this.searchTerm;
    this._router.navigate([url]);
  }

  GoToProduct(VendorID: any) {
    if(this.userid!=null){
    this._router.navigate(['/homePage/productList', { userWishID: VendorID }]);
    }
 
  }

}
