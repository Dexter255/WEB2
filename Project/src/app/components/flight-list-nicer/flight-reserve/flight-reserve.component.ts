import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../flight.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-reserve',
  templateUrl: './flight-reserve.component.html',
  styleUrls: ['./flight-reserve.component.css']
})
export class FlightReserveComponent implements OnInit {
  flightId: number;
  formSeat: FormGroup;

  constructor(private route: ActivatedRoute, 
    public flightService: FlightService) { }

  ngOnInit(): void {
    this.formSeat = new FormGroup({
      'seats': new FormArray([])
    });
    
    this.route.params.subscribe((params: Params) => {
      this.flightId = +params['id'];
      this.flightService.getFlight(this.flightId).subscribe();
      let a = 2;
    });
  }

  onAddSeat(seatNumber: string) {
		let formGroup = new FormGroup({
      'formGroupIndex': new FormControl(null),
      'seatNumber': new FormControl(seatNumber),
      'fullname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'passportNumber': new FormControl(null, [Validators.required, Validators.pattern('([^0-9])(?:11(1\d)1(\d{4}))([^0-9])')])
    });

    (<FormArray>this.formSeat.get('seats')).push(formGroup);
	}

	onDeleteSeat(seatNumber: number) {
    let index: number;
    this.formSeat.get('seats')['controls'].forEach(element => {
      if(element.get('seatNumber').value == seatNumber){
        index = +(<HTMLInputElement>document.getElementById(element.get('seatNumber').value)).value;
      }
    });
    (<FormArray>this.formSeat.get('seats')).removeAt(index);
    //console.log(seatNumber);
	}
  
  checked(rowId: number, seatId: number){
    let element: HTMLInputElement = <HTMLInputElement>document.getElementById(rowId.toString() + '+' + seatId.toString());
    if(element.checked){
      // console.log(rowId + ' : ' + seatId);
      this.onAddSeat(element.name);
    }
    else{
      this.onDeleteSeat(+element.name);
    }
  }

  onSubmit(){
    // let body = {
    //   'RowId': this.rowId,
    //   'SeatId': this.seatId
    // }
    // this.flightService.reserveFlight(this.flightId, body).subscribe();
  }
}
