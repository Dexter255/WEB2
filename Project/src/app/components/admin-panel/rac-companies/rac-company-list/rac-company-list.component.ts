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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private racCompanyService: RacCompanyService,
    public serverService: ServerService) { }

  ngOnInit(): void {
    this.racCompanies = this.racCompanyService.getRacCompanies();
  }

  onAddRacCompany(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }
  
  onDelete(id: number){
    this.racCompanyService.deleteRacCompany(id);
  }
  
}
