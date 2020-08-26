import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../flight.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../../server.service';
import { SeatModel } from 'src/app/models/flight/seat-model.model';

@Component({
  selector: 'app-flight-reserve',
  templateUrl: './flight-reserve.component.html',
  styleUrls: ['./flight-reserve.component.css']
})
export class FlightReserveComponent implements OnInit {
  flightId: number;
  formSeat: FormGroup;

  constructor(private route: ActivatedRoute,
    public flightService: FlightService,
    public serverService: ServerService) { }

  ngOnInit(): void {
    this.formSeat = new FormGroup({
      'seats': new FormArray([])
    });

    this.route.params.subscribe((params: Params) => {
      this.flightId = +params['id'];
      this.flightService.getFlight(this.flightId).subscribe();
      this.serverService.getUserProfile().subscribe();
    });
  }

  onAddSeat(rowId: number, seatId: number, seatNumber: number) {
    let formGroup = new FormGroup({
      'seatNumber': new FormControl(seatNumber),
      'seatFor': new FormControl('Seat for'),
      'rowId': new FormControl(rowId),
      'seatId': new FormControl(seatId),
      'friendUsername': new FormControl(null),
      'fullname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'passportNumber': new FormControl(null, Validators.required)
    });

    (<FormArray>this.formSeat.get('seats')).push(formGroup);
  }

  onDeleteSeat(seatNumber: number) {
    let index: number;
    this.formSeat.get('seats')['controls'].forEach(element => {
      if (element.get('seatNumber').value === seatNumber) {
        index = +(<HTMLInputElement>document.getElementById(element.get('seatNumber').value)).value;
      }
    });
    (<FormArray>this.formSeat.get('seats')).removeAt(index);
  }

  checked(rowId: number, seatId: number, i: number, j: number) {
    let element: HTMLInputElement = <HTMLInputElement>document.getElementById(rowId.toString() + '+' + seatId.toString());
    if (element.checked) {
      this.onAddSeat(rowId, seatId, i * 9 + j + 1);
    }
    else {
      this.onDeleteSeat(i * 9 + j + 1);
    }
  }

  onOptionChange(index: number) {
    if(this.formSeat.get('seats')['controls'][index].get('seatFor').value === 'Me'){
      this.formSeat.get('seats')['controls'][index].patchValue({
        'friendUsername': 'for me',
        'fullname': 'null',
        'passportNumber': '000000000'
      });
    }
    else{
      this.formSeat.get('seats')['controls'][index].patchValue({
        'friendUsername': null,
        'fullname': null,
        'passportNumber': null
      });
    }
  }

  onFriendChange(index: number) {
    this.formSeat.get('seats')['controls'][index].patchValue({
      'friendUsername': this.formSeat.get('seats')['controls'][index].get('friendUsername').value,
      'fullname': 'null',  // kasnije se na backend-u pokupe podaci ako na tom mestu sedi prijatelj
      'passportNumber': '000000000'
    });
  }

  onSubmit() {
    let seats: SeatModel[] = [];

    this.formSeat.get('seats')['controls'].forEach(element => {
      seats.push(new SeatModel(
        element.get('rowId').value,
        element.get('seatId').value,
        element.get('friendUsername').value,
        element.get('fullname').value,
        element.get('passportNumber').value
      ));
    });

    if(seats.length !== 0)
      this.flightService.reserveFlight(this.flightId, seats).subscribe();
  }
}
