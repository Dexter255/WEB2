import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { AirlineService } from '../components/airline.service';

@Injectable()
export class AirlineResolver implements Resolve<Post> {
    
    constructor(private router: Router,
        private airlineService: AirlineService) {}
  
    async resolve(route: ActivatedRouteSnapshot): Promise<Post> {
      await new Promise(resolve => setTimeout(resolve, 0));

      if (this.airlineService.checkAirlineId(+route.params['id'])) {
        return {id: route.params['id']};
      } else {
        this.router.navigateByUrl('error', {skipLocationChange: true});
      }
    }
  }
  