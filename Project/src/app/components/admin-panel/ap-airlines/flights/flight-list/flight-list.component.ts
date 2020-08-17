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

  constructor(private route: ActivatedRoute,
    public flightService: FlightService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flightService.getFlights(+params['id']).subscribe(
        res => {},
        err => {
          console.log(err);
        }
      );
    })
  }

  onAddFlight() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  getTime(time: Time): string {
    return time.hours + ' : ' + time.minutes;
  }
}
