import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
@Injectable()
export class AuthGurd implements CanActivate{
    constructor(private router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     if(localStorage.getItem("access_token")==null){
        this.router.navigate(['/login']);
         return false;
     }
     else{
        
         return true;
     }
    }

}