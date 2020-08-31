import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../airline.service';
import { Airline } from 'src/app/models/flight/airline.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
  sortForm: FormGroup;
  searchAirlines: FormGroup;

  constructor(public airlineService: AirlineService) { }

  ngOnInit(): void {
    this.sortForm = new FormGroup({
      'sortBy': new FormControl(null)
    });

    this.searchAirlines = new FormGroup({
      'companyName': new FormControl(null),
      'address': new FormControl(null),
      'flightStartDestination': new FormControl(null),
      'flightEndDestination': new FormControl(null),
      'flightStartDate': new FormControl(null),
    });

    this.airlineService.getAirlines().subscribe();
  }

  onSearch() {
    let companyName = this.searchAirlines.get('companyName').value;
    let address = this.searchAirlines.get('address').value;
    let flightStartDestination = this.searchAirlines.get('flightStartDestination').value;
    let flightEndDestination = this.searchAirlines.get('flightEndDestination').value;
    let flightStartDate = this.searchAirlines.get('flightStartDate').value;

    let body: any = {};

    if (companyName !== null)
      body.CompanyName = companyName;
    if (address !== null)
      body.Address = address;
    if (flightStartDestination !== null)
      body.FlightStartDestination = flightStartDestination;
    if (flightEndDestination !== null)
      body.FlightEndDestination = flightEndDestination;
    if (flightStartDate !== null)
      body.FlightStartDate = flightStartDate;

    this.airlineService.searchAirlines(body).subscribe();
  }

  onReset() {
    this.airlineService.getAirlines().subscribe(
      res => {
        this.searchAirlines.setValue({
          'companyName': null,
          'address': null,
          'flightStartDestination': null,
          'flightEndDestination': null,
          'flightStartDate': null,
        });
      }
    );
  }

  onSortChange(sortBy: string) {
    if (sortBy === '0') {
      this.airlineService.airlines = this.airlineService.airlines.sort((a, b) => (a.CompanyName > b.CompanyName) ? 1 : -1);
    }
    else if (sortBy === '1') {
      this.airlineService.airlines = this.airlineService.airlines.sort((a, b) => (a.CompanyName > b.CompanyName) ? -1 : 1);
    }
    else if (sortBy === '2') {
      this.airlineService.airlines = this.airlineService.airlines.sort((a, b) => (a.Address > b.Address) ? 1 : -1);
    }
    else if (sortBy === '3') {
      this.airlineService.airlines = this.airlineService.airlines.sort((a, b) => (a.Address > b.Address) ? -1 : 1);
    }
  }

}
