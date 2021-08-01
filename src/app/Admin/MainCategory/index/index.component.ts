import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainCategoryService } from 'src/app/Services/main-category.service';
import { ModalService } from 'src/app/Services/modal.service';
import { Main_Category } from 'src/app/Shared/Main_Category';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  main_Cat:Main_Category[]=[];
  raisedModal = false;
  idForDeleted = 0;
 
  constructor(
    private _Main_CatService:MainCategoryService,
    private router:Router,
    private _modalService: ModalService
  ) {
    this._Main_CatService.GetAllMain_cat().subscribe((data)=>{
      this.main_Cat=data;
      console.log(data);
     
    })
  }

  ngOnInit(): void {
  
  }

  deleteMain_category(id: any)
  {
    console.warn(id);
  this._Main_CatService.DeleteMain_cat(id).subscribe(data=>{
   this.main_Cat=this.main_Cat.filter(item=>item.Id !=id);
    console.log(data)

  });
  }

  ConfirmDelete(id: number) {
    this.raisedModal = true;
    this.idForDeleted = id;
    this._modalService.openPopUp("Delete","Are you Sure you want to Delete this main Category")
    this._modalService.DeleteObserver().subscribe(
      d => {
        if (d){
          if (this.raisedModal){
            this.deleteMain_category(this.idForDeleted);
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
