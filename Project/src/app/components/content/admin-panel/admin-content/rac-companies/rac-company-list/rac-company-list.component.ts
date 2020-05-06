import { Component, OnInit } from '@angular/core';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { RacCompaniesService } from '../rac-companies.service';

@Component({
  selector: 'app-rac-company-list',
  templateUrl: './rac-company-list.component.html',
  styleUrls: ['./rac-company-list.component.css']
})
export class RacCompanyListComponent implements OnInit {
  racCompanies: RentACarCompany[];

  constructor(private racCompaniesServices: RacCompaniesService) { }

  ngOnInit(): void {
    this.racCompanies = this.racCompaniesServices.getRacCompanies();
  }

}
