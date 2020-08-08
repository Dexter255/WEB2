import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginRegisterGuard implements CanActivate{

    constructor(private route: Router) {}
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if(localStorage.getItem('token') === null){
            return true;
        }
        else{
            this.route.navigate(['']);
            return false;
        }
    }
}