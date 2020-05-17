import { Component, OnInit } from '@angular/core';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { RacCompanyService } from '../rac-company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-a-car-companies',
  templateUrl: './rent-a-car-companies.component.html',
  styleUrls: ['./rent-a-car-companies.component.css']
})
export class RentACarCompaniesComponent implements OnInit {

  constructor(private router: Router,
    public racCompanyService: RacCompanyService) { }

  ngOnInit(): void {
    this.racCompanyService.getRacCompanies();
  }

  onSearch(){
    //this.racCompanyService.setRacCompaniesSearch();
    //this.racCompanies = this.racCompanyService.searchRacCompanies(racCompanySearch);
    //this.racCompanyService.getRacCompanies();
    this.router.navigate(['rac-companies']);
  }
  
  onReset(){
    //this.racCompanyService.setRacCompaniesSearch();
    //this.racCompanies = this.racCompanyService.getRacCompanies();
    //this.racCompanyService.getRacCompanies();
    this.router.navigate(['rac-companies']);
  }
}
