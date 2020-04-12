import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight/flight.model';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  @Input() flight: Flight;
  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
