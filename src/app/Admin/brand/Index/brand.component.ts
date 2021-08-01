import { Component, OnInit } from '@angular/core';
import {BrandService} from 'src/app/Services/brand.service';
import { Brand } from 'src/app/Shared/Brand';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  raisedModal = false;
  brands:Brand[]=[];
  idForDeleted = 0;
  constructor(
    private _brandService:BrandService,
    private router:Router,
    private _modalService: ModalService
  ) { 
    this._brandService.GetAllBrand().subscribe((data)=>{
      this.brands=data;
      console.log(data);
    })
  }

  ngOnInit(): void {
    
  }

  deletebrand(id: any)
  {
    console.warn(id);
  this._brandService.DeleteBrand(id).subscribe(data=>{
   this.brands=this.brands.filter(item=>item.Id !=id);
    console.log(data)

  });
  }

  ConfirmDelete(id: number) {
    this.raisedModal = true;
    this.idForDeleted = id;
    this._modalService.openPopUp("Delete","Are you Sure you want to Delete this brand")
    this._modalService.DeleteObserver().subscribe(
      d => {
        if (d){
          if (this.raisedModal){
            this.deletebrand(this.idForDeleted);
            this.raisedModal = false;
          }
        }
        else{
          this.raisedModal = false;
        }
      }
    )
  }
}
