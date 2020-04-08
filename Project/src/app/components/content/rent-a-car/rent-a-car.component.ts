import { Component, OnInit } from '@angular/core';
import { RentACarService } from './rent-a-car.service';

@Component({
  selector: 'app-rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css'],
  providers: [RentACarService]
})
export class RentACarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
