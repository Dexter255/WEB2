import { Component, OnInit } from '@angular/core';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RacCompaniesService } from '../rac-companies.service';

@Component({
  selector: 'app-rac-company-details',
  templateUrl: './rac-company-details.component.html',
  styleUrls: ['./rac-company-details.component.css']
})
export class RacCompanyDetailsComponent implements OnInit {
  racCompany: RentACarCompany;

  constructor(private route: ActivatedRoute,
    private racCompaniesServices: RacCompaniesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = +params['id'];
      this.racCompany = this.racCompaniesServices.getRacCompany(id);
    });
  }

}
