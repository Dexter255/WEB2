import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AirlinesService } from '../airlines.service';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {
  airline: {companyName: string, address: string, description: string};

  constructor(private route: ActivatedRoute,
    private airlinesService: AirlinesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = +params['id'];
      this.airline = this.airlinesService.getAirline(id);
    })
  }

}
