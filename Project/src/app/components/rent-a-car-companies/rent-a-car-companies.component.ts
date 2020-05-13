import { Component, OnInit } from '@angular/core';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { RacCompanyService } from '../rac-company.service';
import { RentACarCompanySearch } from 'src/app/models/rent-a-car/rac-company-search.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-a-car-companies',
  templateUrl: './rent-a-car-companies.component.html',
  styleUrls: ['./rent-a-car-companies.component.css']
})
export class RentACarCompaniesComponent implements OnInit {
  racCompanies: any[];

  constructor(private router: Router,
    private racCompanyService: RacCompanyService) { }

  ngOnInit(): void {
    this.racCompanyService.setRacCompaniesSearch();
    this.racCompanies = this.racCompanyService.getRacCompanies();
  }

  onSearch(racCompanySearch: RentACarCompanySearch){
    this.racCompanyService.setRacCompaniesSearch();
    this.racCompanies = this.racCompanyService.searchRacCompanies(racCompanySearch);
    this.router.navigate(['rac-companies']);
  }
  
  onReset(){
    this.racCompanyService.setRacCompaniesSearch();
    this.racCompanies = this.racCompanyService.getRacCompanies();
    this.router.navigate(['rac-companies']);
  }
}
