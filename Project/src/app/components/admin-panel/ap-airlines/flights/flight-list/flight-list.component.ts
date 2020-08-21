import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Time } from '@angular/common';
import { FlightService } from 'src/app/components/flight.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  private airlineId: number;

  constructor(private route: ActivatedRoute,
    public flightService: FlightService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.airlineId = +params['id'];
      this.flightService.getFlights(this.airlineId).subscribe(
        res => {},
        err => {
          console.log(err);
        }
      );
    });
  }

  onAddFlight() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onDetailsFlight(flightId: number){
    this.router.navigate(['details', flightId], { relativeTo: this.route });
  }

  onEditFlight(flightId: number){
    this.router.navigate(['edit', flightId], { relativeTo: this.route });
  }

  onDeleteFlight(flightId: number){
    this.flightService.deleteFlight(flightId).subscribe(
      res => {
        this.flightService.getFlights(this.airlineId).subscribe();
      },
      err => {
        console.log(err);
      }
    );
  }
}
