import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { Brand } from 'src/app/Shared/Brand';
import { Product } from 'src/app/Shared/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {


  title = "New Products";
  products: Product[] = [];
  brands: Brand[] = [];
  pageNumber = 1;
  Subid=0;

  constructor(
    private _productService: ProductService,
    private actvRout:ActivatedRoute,
    private _brandService: BrandService,private _wishListService:WishlistService
  ) { }

  ngOnInit(): void {
    this.actvRout.paramMap.subscribe((params:ParamMap)=>{
      if(params.get('Subid')!=null){
        this.title = "Products"
        this.Subid=Number(params.get('Subid'));
        this._productService.GetProductsBySubCategory(this.Subid).subscribe(data=>{this.products=data})
      }
      else if(params.get('id') != null && params.get('term') != null){
        this.title = "Search Results"
        let id: number = parseInt(params.get('id')!);
        let term: string = params.get('term')!;
        this._productService.SearchProducts(term, id).subscribe(d => {this.products = d; });
      }

      else if(params.get('id') != null){
        let id: string = params.get('id')!;
        this.title = "Stores's Products"
        this._productService.GetProductsByStore(id).subscribe(d => {this.products = d; });
      }
      else if(params.get('userWishID') != null){
        let id: string = params.get('userWishID')!;
        this._wishListService.GetWishListProductForThisUser(id).subscribe(d => {this.products = d; });
     
      }
      else{
        this.Subid=0;
        this._productService.GetProducts().subscribe(d => {this.products = d; });
      }
     
    });

    this._brandService.GetAllBrand().subscribe(
      d =>{
       this.brands = d;
       if (this.brands.length > 5){
        this.brands = this.brands.slice(0,5)
       }
      });
  }

  SeeMore(){
    if (this.products.length - (4*this.pageNumber) > 0){
      this.pageNumber++;
    }
  }
  
  MaxNumber(i: number): boolean{
    return i < (this.pageNumber * 4);
  }

}
