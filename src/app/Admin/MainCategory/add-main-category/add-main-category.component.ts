import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageUploaderService } from 'src/app/Services/image-uploader.service';
import { MainCategoryService } from 'src/app/Services/main-category.service';
import { FormMain_Cat } from 'src/app/Shared/FormMain_Cat';
import { Main_Category } from 'src/app/Shared/Main_Category';

@Component({
  selector: 'app-add-main-category',
  templateUrl: './add-main-category.component.html',
  styleUrls: ['./add-main-category.component.scss']
})
export class AddMainCategoryComponent implements OnInit {

  main_Cats: Main_Category[] =[];
  selectedPhoto!: File;
  fileToUpload: File;
  imageUrl: string | ArrayBuffer | null | undefined = "http://localhost:9602/Content/Imgs/Main_Categories/default.jpg"

  constructor(
    private _Main_catService: MainCategoryService,
    private _imageUploader: ImageUploaderService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(data: FormMain_Cat) {
    data.imageFile = this.selectedPhoto;
    console.log(data);
    this._Main_catService.PostMain_Cat(data).subscribe(
      data => {
        console.log(data)
        this._router.navigate(["/admin/MainCategory"])
      },
      err => console.log(err)
    )
    
  }

  fileHandle(file: any) {
    this.fileToUpload = file.files.item(0)

    var filereader = new FileReader();
    filereader.onload = (event) => {
      this.imageUrl = event.target?.result;

    }
    filereader.readAsDataURL(this.fileToUpload)
  }
}
