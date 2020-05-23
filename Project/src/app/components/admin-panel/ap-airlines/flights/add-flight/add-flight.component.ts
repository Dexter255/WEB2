import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/components/airline.service';
import { Flight } from 'src/app/models/flight/flight.model';
import { FlightLocation } from 'src/app/models/flight/flight-location.model';
import { Time } from '@angular/common';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  addFlight: FormGroup;


  constructor(private route: ActivatedRoute,
    private airlineService: AirlineService) {

  }

  ngOnInit(): void {
    this.addFlight = new FormGroup({
      'takeOffDateTime': new FormControl(null),
      'landingDateTime': new FormControl(null),
      'flightDuration': new FormControl(null),
      'flightLength': new FormControl(null),
      'destinations': new FormArray([]),
      'flightTicketPrice': new FormControl(null)
    })
  }
  onAddDestination() {
    let formControl = new FormControl(null);

    (<FormArray>this.addFlight.get('destinations')).push(formControl);
  }

  onDeleteDestination(index: number) {
    (<FormArray>this.addFlight.get('destinations')).removeAt(index);
  }

  onSubmit() {
    let companyID = this.route.parent.snapshot.params['id'];


    let takeOffDT = this.addFlight.get('takeOffDateTime').value;
    let takeOffDate = takeOffDT.split('T')[0];
    let takeOffTime = takeOffDT.split('T')[1];

    let takeOffDateTime = new Date(+takeOffDate.split('-')[0],
      +takeOffDate.split('-')[1],
      +takeOffDate.split('-')[2],
      +takeOffTime.split(':')[0],
      +takeOffTime.split(':')[1]
    );

    let landingDT = this.addFlight.get('landingDateTime').value;
    let landingDate = landingDT.split('T')[0];
    let landingTime = landingDT.split('T')[1];

    let landingDateTime = new Date(+landingDate.split('-')[0],
      +landingDate.split('-')[1],
      +landingDate.split('-')[2],
      +landingTime.split(':')[0],
      +landingTime.split(':')[1]
    );

    let time: Time = {hours:+this.addFlight.get('flightDuration').value.split(':')[0], 
                      minutes:+this.addFlight.get('flightDuration').value.split(':')[1]}
                      
    let destinations: FlightLocation[] = [];
    this.addFlight.get('destinations').value.forEach(element => {
      destinations.push(new FlightLocation(0, element));
    });
    let flight = new Flight(0, takeOffDateTime,
      landingDateTime,
      time,
      +this.addFlight.get('flightLength').value,
      destinations,
      +this.addFlight.get('flightTicketPrice').value);
    this.airlineService.addFlight(companyID, flight);

    
  }
}
