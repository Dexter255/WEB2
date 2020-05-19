import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Post } from './post';
import { AdminService } from '../components/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminResolver implements Resolve<Post> {
    
    constructor(private router: Router,
        private adminService: AdminService) {}
  
    async resolve(route: ActivatedRouteSnapshot): Promise<Post> {
      await new Promise(resolve => setTimeout(resolve, 0));

      if (this.adminService.checkAdminId(+route.params['id'])) {
        return {id: route.params['id']};
      } else {
        this.router.navigateByUrl('error', {skipLocationChange: true});
      }
    }
  }