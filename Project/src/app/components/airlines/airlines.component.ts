import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../airline.service';
import { Airline } from 'src/app/models/flight/airline.model';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
  constructor(public airlineService: AirlineService) { }

  ngOnInit(): void {
    this.airlineService.getAirlines().subscribe(
      res => {

      },
      err => {
        console.log(err);
      }
    );
  }

}
