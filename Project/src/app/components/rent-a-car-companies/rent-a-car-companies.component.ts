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
  isFetching = false;

  constructor(private router: Router,
    public racCompanyService: RacCompanyService) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.racCompanyService.getRacCompanies().subscribe(
      res => {
        this.isFetching = false;
      },
      err => {
        this.isFetching = false;
      }
    )
  }

  onSortChange(sortBy: string){
    if(sortBy === '0'){
      this.racCompanyService.racCompanies = this.racCompanyService.racCompanies.sort((a, b) => (a.CompanyName > b.CompanyName) ? 1 : -1);
    }
    else if(sortBy === '1'){
      this.racCompanyService.racCompanies = this.racCompanyService.racCompanies.sort((a, b) => (a.CompanyName > b.CompanyName) ? -1 : 1);
    }
    else if(sortBy === '2'){
      this.racCompanyService.racCompanies = this.racCompanyService.racCompanies.sort((a, b) => (a.Address > b.Address) ? 1 : -1);
    }
    else if(sortBy === '3'){
      this.racCompanyService.racCompanies = this.racCompanyService.racCompanies.sort((a, b) => (a.Address > b.Address) ? -1 : 1);
    }
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
