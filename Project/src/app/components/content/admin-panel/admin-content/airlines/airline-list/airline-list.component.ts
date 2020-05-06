import { Component, OnInit } from '@angular/core';
import { AirlinesService } from '../airlines.service';

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.css']
})
export class AirlineListComponent implements OnInit {
  airlines: {companyName: string, address: string, description: string}[];

  constructor(private airlinesService: AirlinesService) { }

  ngOnInit(): void {
    this.airlines = this.airlinesService.getAirlines();
  }

}
