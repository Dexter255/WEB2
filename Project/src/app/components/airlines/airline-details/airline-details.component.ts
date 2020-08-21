import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AirlineService } from '../../airline.service';
import { Airline } from 'src/app/models/flight/airline.model';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public airlineService: AirlineService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = +params['id'];
      this.airlineService.getAirline(id).subscribe(
        res => { },
        err => {
          console.log(err);
        }
      )
    })
  }

}
