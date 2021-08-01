import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckOutService } from '../Services/check-out.service';
import { ProductService } from '../Services/product.service';
import { UsersService } from '../Services/users.service';
import { Order } from '../Shared/Order';
import { Product } from '../Shared/Product';
import { User } from '../Shared/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  imageUrl: string = "http://localhost:9602/Content/Imgs/Users/"
  userRole: string | null;
  products: Product[]
  orders: Order[]

  constructor(
    private _userService: UsersService,
    private _productService: ProductService,
    private _ordersService: CheckOutService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.DataInit();
  }

  EditPersonalInfo(){
    
    this._router.navigate([`homePage/profile/edit/${this.user.Id}`])
  }


  private DataInit() {
    if (localStorage.getItem("userId") != null) {
      let id: string = localStorage.getItem("userId")!;
      this._userService.GetById(id).subscribe(
        d => {
          this.user = d;
          this.userRole = localStorage.getItem("role");
          this.imageUrl += this.user.Photo;

          if (this.userRole == "Vendor") {
            this._productService.GetProductsByStore(id).subscribe(
              p => {
                this.products = p;
              }
            );
          }
          else if (this.userRole == "User") {
            this._ordersService.GetUserOrders(this.user.Id).subscribe(
              o => {
                this.orders = o;
              }
            )
          }

        }
      );
    }
  }
}


