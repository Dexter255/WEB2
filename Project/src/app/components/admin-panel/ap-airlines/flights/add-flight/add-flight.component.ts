import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AirlineService } from 'src/app/components/airline.service';
import { Destination } from 'src/app/models/flight/destination.model';
import { Flight } from 'src/app/models/flight/flight.model';
import { FlightService } from 'src/app/components/flight.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  addFlight: FormGroup;
  destinations: Destination[];
  header: string = "Add flight";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private airlineService: AirlineService,
    private flightService: FlightService) { }

  ngOnInit(): void {
    let airlineId = +this.route.parent.snapshot.params['id'];

    this.airlineService.getDestinations(airlineId).subscribe(
      (res: Destination[]) => {
        this.destinations = res;
      },
      err => {
        console.log(err);
      }
    );

    this.addFlight = new FormGroup({
      'airlineId': new FormControl(airlineId),
      'flightId': new FormControl(0),
      'destination': new FormGroup({
        'startDestination': new FormControl(null, Validators.required),
        'endDestination': new FormControl(null, Validators.required)
      }, this.compareDestinations),
      'dateAndTime': new FormGroup({
        'startDateAndTime': new FormControl(null, [Validators.required, this.checkDate]),
        'endDateAndTime': new FormControl(null, [Validators.required, this.checkDate]),
      }, this.compareDates),
      'distance': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'locations': new FormArray([]),
      'ticketPrice': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'xSeats': new FormControl('9', [Validators.required, Validators.pattern('^[0-9]*$')]),
      'ySeats': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
    });

    switch (this.route.snapshot['_routerState'].url.split('/')[5]) {
      case 'edit':
        this.route.params.subscribe((params: Params) => {
          this.header = "Edit flight";
          let flightId = +params['id'];

          this.flightService.getFlight(flightId).subscribe(
            (res: Flight) => {
              this.addFlight.setValue({
                'airlineId': airlineId,
                'flightId': res.Id,
                'destination': {
                  'startDestination': res.StartDestination,
                  'endDestination': res.EndDestination
                },
                'dateAndTime': {
                  'startDateAndTime': res.StartDateAndTime,
                  'endDateAndTime': res.EndDateAndTime,
                },
                'distance': res.Distance,
                'locations': [],
                'ticketPrice': res.TicketPrice,
                'xSeats': res.Rows[0].Seats.length,
                'ySeats': res.Rows.length,
              });

              res.Locations.forEach(element => {
                this.onAddLocation(element.City);
              });
            },
            err => {
              console.log(err);
            }
          );
        });
        break;
    }
  }

  checkDate(control: FormControl): { [error: string]: boolean } {
    let currentDate = new Date();

    if(control.value !== null){
      let date = new Date(control.value);

      if(date < currentDate){
        return { 'currentDate': true }; 
      }
      else{
        return null;
      }
    }

    return null;
  }
  
  compareDates(formGroup: FormGroup): { [error: string]: boolean } {
    if(formGroup.get('startDateAndTime').value !== null && formGroup.get('endDateAndTime').value !== null){
      if (new Date(formGroup.get('startDateAndTime').value) >= new Date(formGroup.get('endDateAndTime').value)) {
        return { 'takeOffGreater': true };
      }
    }
    
    return null;
  }
  
  compareDestinations(formGroup: FormGroup): { [error: string]: boolean } | null {
    if (formGroup.get('startDestination').value !== null && formGroup.get('endDestination').value !== null) {
      if (formGroup.get('startDestination').value === formGroup.get('endDestination').value) {
        return { 'sameDestination': true };
      }
      else
        return null;
    }

    return null;
  }

  onAddLocation(city: string = null) {
    let formControl = new FormControl(city, [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2)]);

    (<FormArray>this.addFlight.get('locations')).push(formControl);
  }

  onDeleteLocation(index: number) {
    (<FormArray>this.addFlight.get('locations')).removeAt(index);
  }

  onSubmit() {
    let takeOffDT = this.addFlight.get('dateAndTime').get('startDateAndTime').value;
    let takeOffDate = takeOffDT.split('T')[0];
    let takeOffTime = takeOffDT.split('T')[1];

    let takeOffDateTime = new Date(+takeOffDate.split('-')[0],
      +takeOffDate.split('-')[1] - 1,
      +takeOffDate.split('-')[2],
      +takeOffTime.split(':')[0],
      +takeOffTime.split(':')[1]
    );

    let landingDT = this.addFlight.get('dateAndTime').get('endDateAndTime').value;
    let landingDate = landingDT.split('T')[0];
    let landingTime = landingDT.split('T')[1];

    let landingDateTime = new Date(+landingDate.split('-')[0],
      +landingDate.split('-')[1] - 1,
      +landingDate.split('-')[2],
      +landingTime.split(':')[0],
      +landingTime.split(':')[1]
    );

    let duration = landingDateTime.valueOf() - takeOffDateTime.valueOf();
    duration = duration / 1000;
    duration = duration / 60;
    let hh = Math.floor(duration / 60);
    let mm = duration % 60;
    let mmString = mm < 10 ? '0' + mm : mm;
    let hours: string = hh + ':' + mmString + ':00';
    
    let locations: Destination[] = [];
    this.addFlight.get('locations').value.forEach(element => {
      locations.push(new Destination(0, element));
    });

    let flight = new Flight(
      this.addFlight.get('flightId').value,
      this.addFlight.get('destination').get('startDestination').value,
      this.addFlight.get('destination').get('endDestination').value,
      takeOffDateTime,
      landingDateTime,
      hours,
      this.addFlight.get('distance').value,
      locations,
      this.addFlight.get('ticketPrice').value,
      this.addFlight.get('xSeats').value,
      this.addFlight.get('ySeats').value
    );

    if (this.addFlight.get('flightId').value === 0) {
      this.flightService.addFlight(this.addFlight.get('airlineId').value, flight).subscribe(
        res => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      this.flightService.updateFlight(flight).subscribe(
        res => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
