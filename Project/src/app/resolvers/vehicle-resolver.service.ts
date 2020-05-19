import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { RacCompanyService } from '../components/rac-company.service';
import { VehicleService } from '../components/vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleResolver implements Resolve<Post> {

  constructor(private router: Router,
    private vehicleService: VehicleService) { }

  async resolve(route: ActivatedRouteSnapshot): Promise<Post> {    
    if (this.vehicleService.checkVehicleId(+route.parent.params['id'], +route.params['id'])) {
      return { id: route.params['id'] };
    } else {
      this.router.navigateByUrl('error', { skipLocationChange: true });
    }
  }
}
