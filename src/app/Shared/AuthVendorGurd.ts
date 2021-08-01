import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable()
export class AuthVendorGurd implements CanActivate{
    constructor(private router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     if(localStorage.getItem("access_token")==null){
         
        this.router.navigate(['/login']);
         return false;
     }
     else{
        if(localStorage.getItem("role")=="Vendor"){
           
            return true
        }
        this.router.navigate(['/login']);
        alert("You Are Not Admin ..Please Login As Admin");
         return false;
     }
    }

}