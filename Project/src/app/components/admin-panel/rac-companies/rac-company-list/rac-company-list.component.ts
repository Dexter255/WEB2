import { Component, OnInit } from '@angular/core';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { RacCompanyService } from 'src/app/components/rac-company.service';
import { ServerService } from 'src/app/components/server.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rac-company-list',
  templateUrl: './rac-company-list.component.html',
  styleUrls: ['./rac-company-list.component.css']
})
export class RacCompanyListComponent implements OnInit {
  racCompanies: RentACarCompany[];
  notAllowed: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public racCompanyService: RacCompanyService,
    private serverService: ServerService) { }

  ngOnInit(): void {
    //this.racCompanies = this.racCompanyService.getRacCompanies();
    this.racCompanies = [];
    this.racCompanyService.getRacCompanies().subscribe(
      res => {
        this.racCompanies = res as RentACarCompany[];
      },
      err => {
        console.log(err);
      }
    );
    this.notAllowed = this.serverService.getUserType() !== 'Admin' ? true : false;
  }

  onAddRacCompany(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }
  
  onDeleteRacCompany(companyId: number){
    this.racCompanyService.deleteRacCompany(companyId).subscribe(
      res => {
        // DATI OBAVESTENJE
      },
      err => {
        console.log(err);
      }
    );
  }
  
  onEditRacCompany(companyId: number){
    this.router.navigate(['edit', companyId], {relativeTo: this.route});
  }

  onDetailsRacCompany(companyId: number){
    this.router.navigate(['details', companyId], {relativeTo: this.route});
  }

  onSeeVehicles(companyId: number){
    this.router.navigate([companyId, 'vehicles'], {relativeTo: this.route});
  }
}
