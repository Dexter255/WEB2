import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: string[];

  constructor(private flightsService: FlightsService) { }

  ngOnInit(): void {
    this.flights = this.flightsService.getFlights();
  }

}
