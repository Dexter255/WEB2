import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Flight } from 'src/app/models/flight/flight.model';
import { AirlineService } from 'src/app/components/airline.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: Flight[];

  constructor(private route: ActivatedRoute,
              private airlineService: AirlineService,
              private router: Router) { }

  ngOnInit(): void {
    this.flights = [];
    
    this.route.params.subscribe((params:Params)=>{
      this.flights = this.airlineService.getFlights(+params['id']);
    })
  }

  onAddFlight()
  {
    this.router.navigate(['add'], {relativeTo: this.route});
  }
  
  getTime(time:Time): string
  {
    return time.hours + ':' + time.minutes;
  }
}
