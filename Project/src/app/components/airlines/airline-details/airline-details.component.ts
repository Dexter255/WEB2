import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AirlineService } from '../../airline.service';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {
  airline: {companyName: string, description: string};

  constructor(private route: ActivatedRoute,
    private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = +params['id'];
      this.airline = this.airlineService.getAirline(id);
    })
  }

}
