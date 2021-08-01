import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainCategoryService } from 'src/app/Services/main-category.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { Main_Category } from 'src/app/Shared/Main_Category';
import { SubCategory } from 'src/app/Shared/SubCategory';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {

  constructor(
    private _SubcategoryService:SubcategoryService,
    private _MaincategoryService:MainCategoryService,
    private _router: Router
    ) { }
  subcategory:SubCategory =new SubCategory(0,"",0,"","","",null,0)
  subcategories:SubCategory[]=[];
  maincategories:Main_Category[]=[];
  imageUrl: any = "./assets/images/def.png"
  fileToUpload!: File
  //filestring:string

  ngOnInit(): void {
    this._SubcategoryService.getAllSubcategories().subscribe((data)=>
    {
      this.subcategories=data;
      //this.subcategories=this.subcategories.filter(item=>item.Id!=Id);
    });
    this._MaincategoryService.GetAllMain_cat().subscribe(data=>{
    this.maincategories=data
    });
   
    
    //this._MaincategoryService.getAllMaincategories()
    //this.maincategories=[new Main_Category(1,"phones",""),new Main_Category(2,"labs","")];
  }

  
  onSubmit(data:any)
  {
    //this.subcategory.Photo=this.filestring;
    this.subcategory.imageFile=this.fileToUpload;

    this._SubcategoryService.addSubcategory(this.subcategory/*,this.fileToUpload*/).subscribe(data=>
      {
        this._router.navigate(['/admin/subcategory'])
      },error=>
      {
        console.log(error)
      });
  }
  fileHandle(file: any) 
  {
    this.fileToUpload = file.files.item(0)
    var filereader = new FileReader();
    /*filereader.onloadend = (e) => {
      console.log(filereader.result);
      this.filestring = filereader.result as string;
   };*/
    filereader.onload = (event) => {
      this.imageUrl = event.target?.result;
      console.log(this.imageUrl);
    }
    filereader.readAsDataURL(this.fileToUpload)
  }
  

}
