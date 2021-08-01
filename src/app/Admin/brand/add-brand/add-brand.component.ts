import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { ImageUploaderService } from 'src/app/Services/image-uploader.service';
import { Brand } from 'src/app/Shared/Brand';
import { FormBrand } from 'src/app/Shared/FormBrand';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
})
export class AddBrandComponent implements OnInit {
  brands: Brand[] = [];
  selectedPhoto!: File;
  url: string = 'http://localhost:9602/api/brand';
  constructor(
    private _brandService: BrandService,
    private _imageUploader: ImageUploaderService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(data: FormBrand) {
    data.imageFile = this.selectedPhoto;
    console.log(data);
    this._brandService.PostBrand(data).subscribe(
      (data) => this._router.navigate(["/admin/brand"]),
      err => console.log(err)
    )
    
  }

  UploadImage(): void {
    let input = document.getElementById('imageFile')! as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedPhoto = input.files[0];
      let image = input.files[0];
      this._imageUploader
        .Upload(image)
        .subscribe(
          (d) => ((document.getElementById('img')! as HTMLImageElement).src = d)
        );
    }
  }
}
