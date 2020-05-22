import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  addFlight : FormGroup;


  constructor() { }

  ngOnInit(): void {
    this.addFlight = new FormGroup({
      'takeOffDateTime':new FormControl(null),
      'landingDateTime':new FormControl(null),
      'flightDuration':new FormControl(null),
      'flightLength':new FormControl(null),
      'numberOfLocations':new FormControl(null),
      'flightTicketPrice': new FormControl(null)
    })
  }
  
  onSubmit(){

  }
}
