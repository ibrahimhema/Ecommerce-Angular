import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckOutService } from 'src/app/Services/check-out.service';
import { Order } from 'src/app/Shared/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders:Order[]=[];
  
  constructor(
    private _checkOut:CheckOutService,
    private router:Router
  ) { 
    this._checkOut.GetAllOrders().subscribe((data)=>{
      this.orders=data;
      console.log(data);
    })
  }

  ngOnInit(): void {
  }

}