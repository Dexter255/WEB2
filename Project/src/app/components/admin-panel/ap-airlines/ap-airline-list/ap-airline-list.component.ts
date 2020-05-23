import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/components/airline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/components/server.service';
import { Airline } from 'src/app/models/flight/airline.model';

@Component({
  selector: 'app-ap-airline-list',
  templateUrl: './ap-airline-list.component.html',
  styleUrls: ['./ap-airline-list.component.css']
})
export class ApAirlineListComponent implements OnInit {
  airlines: Airline[];
  notAllowed: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private airlineService: AirlineService,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.airlines = this.airlineService.getAirlines();
    this.notAllowed = this.serverService.getUserType() !== 'Admin' ? true : false;
  }

  onAddAirline(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }
  
  onDeleteAirline(index: number){
    this.airlineService.deleteAirline(index);
  }

  onEditAirline(index: number){
    this.router.navigate(['edit', index], {relativeTo: this.route});
  }
  
  onDetailsAirline(index: number){
    this.router.navigate(['details', index], {relativeTo: this.route});
  }

  onSeeFlights(companyId: number){
    this.router.navigate([companyId, 'flights'], {relativeTo: this.route});
  }
}
