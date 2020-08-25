import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/components/flight.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Flight } from 'src/app/models/flight/flight.model';
import { ServerService } from 'src/app/components/server.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  flightId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public flightService: FlightService,
    public serverService: ServerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flightId = +params['id'];

      this.flightService.getFlight(this.flightId).subscribe(
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

  onReserve(){
    this.router.navigate(['../../reserve', this.flightId], {relativeTo: this.route});
  }
}
