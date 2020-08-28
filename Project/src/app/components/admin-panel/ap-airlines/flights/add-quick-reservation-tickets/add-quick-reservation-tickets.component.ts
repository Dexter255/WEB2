import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/components/flight.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { SeatModel } from 'src/app/models/flight/seat-model.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-quick-reservation-tickets',
  templateUrl: './add-quick-reservation-tickets.component.html',
  styleUrls: ['./add-quick-reservation-tickets.component.css']
})
export class AddQuickReservationTicketsComponent implements OnInit {
  flightId: number;
  formSeat: FormGroup;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public flightService: FlightService) { }

  ngOnInit(): void {
    this.formSeat = new FormGroup({
      'seats': new FormArray([])
    });
    
    this.route.params.subscribe((params: Params) => {
      this.flightId = +params['id'];
      this.flightService.getFlight(this.flightId).subscribe();
    });
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

  onAddSeat(rowId: number, seatId: number, seatNumber: number) {
    let formGroup = new FormGroup({
      'seatNumber': new FormControl(seatNumber),
      'rowId': new FormControl(rowId),
      'seatId': new FormControl(seatId),
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

  onSubmit() {
    let a = this.formSeat.get('seats')['controls'];
    let seats: SeatModel[] = [];

    this.formSeat.get('seats')['controls'].forEach(element => {
      seats.push(new SeatModel(
        element.get('rowId').value,
        element.get('seatId').value
      ));
    });

    if(seats.length !== 0){
      this.flightService.addSeatsForQuickReservationTickets(this.flightId, seats).subscribe(
        res => {
          this.toastr.success('Seats for quick reservation tickets successfully added.', 'Quick reservation tickets');
          //this.router.navigate(['reservations']);
        }
      );
    }
  }
}