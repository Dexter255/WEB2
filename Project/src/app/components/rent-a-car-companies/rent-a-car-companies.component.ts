import { Component, OnInit } from '@angular/core';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { RacCompanyService } from '../rac-company.service';

@Component({
  selector: 'app-rent-a-car-companies',
  templateUrl: './rent-a-car-companies.component.html',
  styleUrls: ['./rent-a-car-companies.component.css']
})
export class RentACarCompaniesComponent implements OnInit {
  racCompanies: RentACarCompany[];

  constructor(private racCompanyService: RacCompanyService) { }

  ngOnInit(): void {
    this.racCompanies = this.racCompanyService.getRacCompanies();
  }

}
