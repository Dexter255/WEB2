import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../airline.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
  airlines: {companyName: string, description: string}[];

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.airlines = this.airlineService.getAirlines();
  }

}
