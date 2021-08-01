import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainCategoryService } from 'src/app/Services/main-category.service';
import { Main_Category } from 'src/app/Shared/Main_Category';

@Component({
  selector: 'app-edit-main-category',
  templateUrl: './edit-main-category.component.html',
  styleUrls: ['./edit-main-category.component.scss']
})
export class EditMainCategoryComponent implements OnInit {
  main_Cat: Main_Category;
  ImageUrl: string | null | ArrayBuffer | undefined= "http://localhost:9602/Content/Imgs/Main_Categories/"
  selectedPhoto: File;

  constructor(
    private _activeRouter:ActivatedRoute,
    private _router: Router,
    private _main_CatService:MainCategoryService
    ) { }

  ngOnInit(): void {
    console.warn(this._activeRouter.snapshot.params.id);
    this._main_CatService.getById(this._activeRouter.snapshot.params.id).subscribe((data)=>{
      this.main_Cat=data;
      this.ImageUrl += data.Photo
      console.log(data);
    })
  }

  UpdateMain_Cat(){
    this.main_Cat.imageFile = this.selectedPhoto;

    console.log(this.main_Cat)
    this._main_CatService.PutMain_Cat(this.main_Cat).subscribe(
      d => {
        this._router.navigate(["/admin/MainCategory"]);
      },
      err => console.log(err)
    )

  }

 fileHandle(file: any) {
    this.selectedPhoto = file.files.item(0)

    var filereader = new FileReader();
    filereader.onload = (event) => {
      this.ImageUrl = event.target?.result;
    }
    filereader.readAsDataURL(this.selectedPhoto)
  }

  FileSelected(){
    let input = document.getElementById('imageFile')! as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedPhoto = input.files[0];
      let image = input.files[0];
      console.log(this.selectedPhoto);
    }}
  
}
