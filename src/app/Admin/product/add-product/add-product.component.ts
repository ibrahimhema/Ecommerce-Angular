import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { Brand } from 'src/app/Shared/Brand';
import { Product } from 'src/app/Shared/Product';

import { SubCategory } from 'src/app/Shared/SubCategory';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productData: Product
  SubCategories: SubCategory[]
  Brands: Brand[]
  Vendor_id = localStorage.getItem("userId")

  imageUrl: any = "./assets/images/def.png"
  fileToUpload!: File
  errors: string = ""
  constructor(private serviceSubCat: SubcategoryService, private brandService: BrandService,private router:Router,private productser:ProductService) {
    this.productData = new Product("", 0, "", 0, "", 0, 0, 0, 0, "", null, this.Vendor_id == null ? "" : this.Vendor_id, 0, 0, "", null!, null!, null!, null!);
    this.serviceSubCat.getAllSubcategories().subscribe(data => {
      this.SubCategories = data;
    })
    this.brandService.GetAllBrand().subscribe(data => {
      this.Brands = data
    })
  }

  ngOnInit(): void {
  }
  fileHandle(file: any) {
    this.fileToUpload = file.files.item(0)

    var filereader = new FileReader();
    filereader.onload = (event) => {
      this.imageUrl = event.target?.result;

    }
    filereader.readAsDataURL(this.fileToUpload)
  }
  onSubmit() { 

    this.productData.Photo=this.fileToUpload;

    this.productser.addProduct(this.productData).subscribe(data => {
    if (localStorage.getItem("role") == "Admin")
      this.router.navigate(['/admin/product']);
    else if (localStorage.getItem("role") == "Vendor")
      this.router.navigate(['/homePage/profile']);
    
    }, error => {this.errors=error.error.error_description;console.log(error.error)});
  }
}
