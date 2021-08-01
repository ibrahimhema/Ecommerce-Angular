import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/Services/modal.service';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Shared/Product';
declare var $: any;

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.scss']
})
export class IndexProductComponent implements OnInit {

  products: Product[]
  idForDeleted = 0
  raisedModal = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private _modalService: ModalService
    ) { }

  ngOnInit(): void {
    this.productService.GetProducts().subscribe(data => {
      this.products = data
    });
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(data => {
      console.log(data)
      this.products = this.products.filter(item => item.Id != id)
      this.router.navigate(['/admin/product']);
    }, error => { console.log(error.error) });
  }

  openPopUp(id: number) {
    this.raisedModal = true;
    this.idForDeleted = id;
    this._modalService.openPopUp("Delete","Are you Sure you want to Delete that product")
    this._modalService.DeleteObserver().subscribe(
      d => {
        if (this.raisedModal){
          this.deleteProduct(this.idForDeleted);
          this.raisedModal = false;
        }
      }
    )

  }

  funFromPopUp() {
    this.deleteProduct(this.idForDeleted);
  }
}
