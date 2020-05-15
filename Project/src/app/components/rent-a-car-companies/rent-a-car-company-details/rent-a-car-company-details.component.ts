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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private racCompanyServices: RacCompanyService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let companyId = +params['id'];
      this.racCompanyServices.getRacCompany(companyId).subscribe(
        res => {
          this.racCompany = res as RentACarCompany;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  onSeeVehicles(companyId: number){
    this.router.navigate(['../../', companyId, 'vehicles'], {relativeTo: this.route});
  }
}
