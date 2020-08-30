import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ServerService } from '../components/server.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(private router: Router,
        private toastr: ToastrService,
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
                    this.toastr.error("You do not have permission to access this resource!", 'Forbidden');
                    this.router.navigate(['']);
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