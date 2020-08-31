import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../flight.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ReservedFlight } from 'src/app/models/flight/reserved-flight.model';

@Component({
  selector: 'app-reserved-flight-details',
  templateUrl: './reserved-flight-details.component.html',
  styleUrls: ['./reserved-flight-details.component.css']
})
export class ReservedFlightDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public flightService: FlightService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flightService.getReservedFlight(+params['id']).subscribe(
        (res: ReservedFlight) => {
          this.flightService.getFlight(res.FlightId).subscribe();
        },
        err => {}
      );
    });
  }

  convertDate(dateAndTime: Date): string {
    let dateTime = dateAndTime.toLocaleString();
    let dateSplited = dateTime.split('T')[0].split('-');

    return dateSplited[2] + '-' + dateSplited[1] + '-' + dateSplited[0] + ' ' + dateTime.split('T')[1];
  }
}
