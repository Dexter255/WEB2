import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ServerService } from '../components/server.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(private router: Router,
        private serverService: ServerService) {}
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if(localStorage.getItem('token') !== null){
            let roles = next.data['roles'] as Array<string>;
            if(roles){
                if(roles.includes(this.serverService.getUserType())){
                    return true;
                }
                else{
                    //     FORBIDDEN
                    //this.router.navigate(['forbidden']);
                    this.router.navigateByUrl('forbidden', {skipLocationChange: true});
                    return false;
                }
            }
            return true;
        }
        else{
            this.router.navigate(['']);
            return false;
        }
    }
}