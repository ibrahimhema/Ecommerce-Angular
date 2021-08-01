import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategoryNavBarService } from 'src/app/Services/sub-category-nav-bar.service';
import { SubCategoryForVanBar } from 'src/app/Shared/SubCategoryForNavBar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  subctWithChild:SubCategoryForVanBar[]=[]
  constructor(private src:SubCategoryNavBarService,private router:Router) { }

  ngOnInit(): void {
    this.src.GetSubWithChild().subscribe(data=>{this.subctWithChild=data})
  }
  GoToSubProduct(id:number){
    this.router.navigate(['/homePage/productList',{Subid:id}])
   
  }
}
