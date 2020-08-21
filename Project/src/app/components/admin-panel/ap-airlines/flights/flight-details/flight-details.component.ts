import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/components/flight.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Flight } from 'src/app/models/flight/flight.model';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public flightService: FlightService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let flightId = +params['id'];

      this.flightService.getFlight(flightId).subscribe(
        res => { },
        err => {
          console.log(err);
        }
      )
    });
  }

  convertDate(dateAndTime: Date): string {
    let dateTime = dateAndTime.toLocaleString();
    let dateSplited = dateTime.split('T')[0].split('-');

    return dateSplited[2] + '-' + dateSplited[1] + '-' + dateSplited[0] + ' ' + dateTime.split('T')[1];
  }
}
