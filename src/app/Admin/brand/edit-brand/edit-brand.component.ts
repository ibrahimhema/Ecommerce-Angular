import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/Shared/Brand';
import {BrandService} from 'src/app/Services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {

  brand: Brand;
  ImageUrl: string | null | ArrayBuffer | undefined= "http://localhost:9602/Content/Imgs/Brands/"
  selectedPhoto: File;

  constructor(
    private _activeRouter:ActivatedRoute,
    private _router: Router,
    private _brandService:BrandService
    ) { }

  ngOnInit(): void {
    console.warn(this._activeRouter.snapshot.params.id);
    this._brandService.getById(this._activeRouter.snapshot.params.id).subscribe((data)=>{
      this.brand=data;
      this.ImageUrl += data.Photo
      console.log(data);
    })
  }

  UpdateBrand(){
    this.brand.imageFile = this.selectedPhoto;

    console.log(this.brand)
    this._brandService.PutBrand(this.brand).subscribe(
      d => {
        this._router.navigate(["/admin/brand"]);
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
    }
  }


}
