import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css']
})
export class VehicleSearchComponent implements OnInit {
  searchVehicles: FormGroup;

  types: string[] = ['Cabriolet', 'Caravan', 'Saloon', 'Hatchback', 'Coupe', 'Miniven', 'SUV'];
  seats: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  @Output() search = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
    this.searchVehicles = new FormGroup({
      'pickupDate': new FormControl(null),
      'getInCity': new FormControl(null),
      'returnDate': new FormControl(null),
      'returnToCity': new FormControl(null),
      'type': new FormControl(null),
      'seat': new FormControl(null)
    })
  }

  onSearch(){
    this.search.emit();
  }
  
  onReset(){
    this.reset.emit();
  }
}
