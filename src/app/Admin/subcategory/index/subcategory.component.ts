import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/Services/modal.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { SubCategory } from 'src/app/Shared/SubCategory';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  
  subcategories:SubCategory[]=[]
  raisedModal = false;
  idForDeleted = 0;

  constructor(
    private _SubcategoryService:SubcategoryService,
    private router:Router,
    private _modalService: ModalService
  ) { }
  

  ngOnInit(): void {
   this._SubcategoryService.getAllSubcategories().subscribe((data)=>
    {
      this.subcategories=data
    })
  }
  deleteSubcategory(id: any)
  {
    console.warn(id);
    this._SubcategoryService.deleteSubcategory(id).subscribe(data=>{
    this.subcategories=this.subcategories.filter(item=>item.Id !=id);
    console.log(data)

  });
  }

  ConfirmDelete(id: number) {
    this.raisedModal = true;
    this.idForDeleted = id;
    this._modalService.openPopUp("Delete","Are you Sure you want to Delete this Sub Category")
    this._modalService.DeleteObserver().subscribe(
      d => {
        if (d){
          if (this.raisedModal){
            this.deleteSubcategory(this.idForDeleted);
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
