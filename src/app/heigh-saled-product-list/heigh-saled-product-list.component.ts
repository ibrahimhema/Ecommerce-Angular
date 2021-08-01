import { Component, OnInit } from '@angular/core';
import { BrandService } from '../Services/brand.service';
import { ProductService } from '../Services/product.service';
import { Brand } from '../Shared/Brand';
import { Product } from '../Shared/Product';

@Component({
  selector: 'app-heigh-saled-product-list',
  templateUrl: './heigh-saled-product-list.component.html',
  styleUrls: ['./heigh-saled-product-list.component.scss']
})
export class HeighSaledPRoductListComponent implements OnInit {
  heighSaleProduct:Product[]=[]
  brands: Brand[] = [];
  
  constructor(
    private _productService: ProductService,
    private _brandService: BrandService
    ) { 
      this._productService.GetProducts().subscribe(
        data=>{
          this.heighSaleProduct=data;
          if (this.heighSaleProduct.length > 4){
            this.heighSaleProduct = this.heighSaleProduct.slice(0,4);
          }
          this.heighSaleProduct.sort((a,b)=>b.Sell_Count-a.Sell_Count)
    })
    }

  ngOnInit(): void {
    this._brandService.GetAllBrand().subscribe(
      d => 
      {
        this.brands = d
        if (this.brands.length > 5){
          this.brands = this.brands.slice(0,5);
        }
      }
    );
  }

}
