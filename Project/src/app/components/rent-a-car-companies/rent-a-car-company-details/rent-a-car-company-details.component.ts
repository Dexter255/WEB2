import { Component, OnInit } from '@angular/core';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RacCompanyService } from '../../rac-company.service';

@Component({
  selector: 'app-rent-a-car-company-details',
  templateUrl: './rent-a-car-company-details.component.html',
  styleUrls: ['./rent-a-car-company-details.component.css']
})
export class RentACarCompanyDetailsComponent implements OnInit {
  racCompany: RentACarCompany;
  companyId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private racCompanyServices: RacCompanyService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.companyId = +params['id'];
      this.racCompany = this.racCompanyServices.getRacCompany(this.companyId);
    });
  }

  onSeeVehicles(){
    this.router.navigate(['../../', this.companyId, 'vehicles'], {relativeTo: this.route});
  }
}
