import { Component, OnInit, Input } from '@angular/core';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { RacCompaniesService } from '../../rac-companies.service';
import { ServerService } from 'src/app/components/server.service';

@Component({
  selector: '[app-rac-company]',
  templateUrl: './rac-company.component.html',
  styleUrls: ['./rac-company.component.css']
})
export class RacCompanyComponent implements OnInit {
  @Input() racCompany: RentACarCompany;
  @Input() id: number;

  constructor(private racCompaniesService: RacCompaniesService,
    public serverService: ServerService) { }

  ngOnInit(): void {
  }

  onDelete(){
    this.racCompaniesService.deleteRacCompany(this.id);
  }
}
