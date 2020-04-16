import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../flights.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Flight } from 'src/app/models/flight/flight.model';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  flight: Flight;
  id: number;

  constructor(private flightsService: FlightsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
      this.id = +this.route.snapshot.params['id'];
      this.flight = this.flightsService.getFlight(this.id);
    });
  }

}
