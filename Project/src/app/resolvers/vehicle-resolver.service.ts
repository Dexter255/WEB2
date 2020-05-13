import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { RacCompanyService } from '../components/rac-company.service';

@Injectable()
export class VehicleResolver implements Resolve<Post> {

  constructor(private router: Router,
    private racCompanyService: RacCompanyService) { }

  async resolve(route: ActivatedRouteSnapshot): Promise<Post> {
    await new Promise(resolve => setTimeout(resolve, 0));
    
    if (this.racCompanyService.checkVehicleId(+route.parent.params['id'], +route.params['id'])) {
      return { id: route.params['id'] };
    } else {
      this.router.navigateByUrl('error', { skipLocationChange: true });
    }
  }
}
