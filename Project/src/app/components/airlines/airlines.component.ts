import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../airline.service';
import { Airline } from 'src/app/models/flight/airline.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
  sortForm: FormGroup;

  constructor(public airlineService: AirlineService) { }

  ngOnInit(): void {
    this.sortForm = new FormGroup({
      'sortBy': new FormControl(null)
    });
    
    this.airlineService.getAirlines().subscribe(
      res => {

      },
      err => {
        console.log(err);
      }
    );
  }

  onSortChange(sortBy: string){
    if(sortBy === '0'){
      this.airlineService.airlines = this.airlineService.airlines.sort((a, b) => (a.CompanyName > b.CompanyName) ? 1 : -1);
    }
    else if(sortBy === '1'){
      this.airlineService.airlines = this.airlineService.airlines.sort((a, b) => (a.CompanyName > b.CompanyName) ? -1 : 1);
    }
    else if(sortBy === '2'){
      this.airlineService.airlines = this.airlineService.airlines.sort((a, b) => (a.Address > b.Address) ? 1 : -1);
    }
    else if(sortBy === '3'){
      this.airlineService.airlines = this.airlineService.airlines.sort((a, b) => (a.Address > b.Address) ? -1 : 1);
    }
  }
  
}
