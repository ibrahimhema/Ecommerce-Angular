import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckOutService } from 'src/app/Services/check-out.service';
import { CheckOutForm } from 'src/app/Shared/CheckOutForm';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
order:CheckOutForm

  constructor( 
    private _checkOut:CheckOutService,
    private _activeRouter:ActivatedRoute,
    private _router: Router,
    ) { }

  ngOnInit(): void {
    console.warn(this._activeRouter.snapshot.params.id);
    this._checkOut.getById(this._activeRouter.snapshot.params.id).subscribe((data)=>{
      this.order=data;
      
      console.log(data);
    })
  }
  UpdateOrder(data: CheckOutForm){
    
    console.log(data);
    this.order.Status=data.Status;
    this._checkOut.PutOrder(this.order).subscribe(
      d => {
        this._router.navigate(["/admin/orders"]);
      },
      err => console.log(err)
    )


  }

 
  

}
