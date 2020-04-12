import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../flights.service';
import { Flight } from 'src/app/models/flight/flight.model';


@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: Flight[];

  constructor(private flightsService: FlightsService) { }

  ngOnInit(): void {
    this.flights = this.flightsService.getFlights();
  }

}
