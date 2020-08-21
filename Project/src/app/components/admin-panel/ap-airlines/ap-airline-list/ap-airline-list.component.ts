import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/components/airline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/components/server.service';
import { Airline } from 'src/app/models/flight/airline.model';
import { UserType } from 'src/app/models/korisnik/user-type.model';

@Component({
  selector: 'app-ap-airline-list',
  templateUrl: './ap-airline-list.component.html',
  styleUrls: ['./ap-airline-list.component.css']
})
export class ApAirlineListComponent implements OnInit {
  notAllowed: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public airlineService: AirlineService,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.airlineService.getAirlines().subscribe(
      res => { },
      err => {
        console.log(err);
      }
    );
    this.notAllowed = this.serverService.getUserType() !== UserType[UserType.Admin_Airlines] ? true : false;
  }

  onAddAirline() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onDeleteAirline(airlineId: number) {
    this.airlineService.deleteAirline(airlineId).subscribe(
      res => {
        this.airlineService.getAirlines().subscribe(
          res => { },
          err => {
            console.log(err);
          }
        );
      },
      err => {

      }
    );
  }

  onEditAirline(airlineId: number) {
    this.router.navigate(['edit', airlineId], { relativeTo: this.route });
  }

  onDetailsAirline(airlineId: number) {
    this.router.navigate(['details', airlineId], { relativeTo: this.route });
  }

  onSeeFlights(airlineId: number) {
    this.router.navigate([airlineId, 'flights'], { relativeTo: this.route });
  }

  onSeeTickets(airlineId: number){
    this.router.navigate([airlineId, 'tickets'], { relativeTo: this.route });
  }
}
