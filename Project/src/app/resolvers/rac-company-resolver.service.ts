import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Post } from './post';
import { RacCompanyService } from '../components/rac-company.service';

@Injectable()
export class RacCompanyResolver implements Resolve<Post> {
    
    constructor(private router: Router,
        private racCompanyService: RacCompanyService) {}
  
    async resolve(route: ActivatedRouteSnapshot): Promise<Post> {
      if (this.racCompanyService.checkRacCompanyId(+route.params['id'])) {
        return {id: route.params['id']};
      } else {
        this.router.navigateByUrl('error', {skipLocationChange: true});
      }
    }
  }
  