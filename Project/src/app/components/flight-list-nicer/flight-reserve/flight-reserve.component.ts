import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { FlightService } from '../../flight.service';
import { ServerService } from '../../server.service';
import { SeatType } from 'src/app/models/flight/seat-type.model';
import { Passenger } from 'src/app/models/flight/passenger.model';

@Component({
	selector: 'app-flight-reserve',
	templateUrl: './flight-reserve.component.html',
	styleUrls: ['./flight-reserve.component.css']
})
export class FlightReserveComponent implements OnInit {
	flightId: number;
	formSeat: FormGroup;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		public flightService: FlightService,
		public serverService: ServerService) { }

	ngOnInit(): void {
		if (this.route.snapshot['_routerState'].url.split('/')[1] === 'tickets')
			this.flightService.areTickets = true;
		else
			this.flightService.areTickets = false;

		this.formSeat = new FormGroup({
			'seats': new FormArray([])
		});

		this.route.params.subscribe((params: Params) => {
			this.flightId = +params['id'];
			this.flightService.getFlight(this.flightId).subscribe();
			this.serverService.getUserProfile().subscribe();
		});
	}

	convertEnum(seatType: SeatType) {
		return SeatType[seatType];
	}

	onAddSeat(rowId: number, seatId: number, seatNumber: number) {
		let formGroup = new FormGroup({
			'seatNumber': new FormControl(seatNumber),
			'seatFor': new FormControl('Seat for'),
			'rowId': new FormControl(rowId),
			'seatId': new FormControl(seatId),
			'friendUsername': new FormControl(null),
			'fullname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'passportNumber': new FormControl(null, [Validators.required, Validators.pattern('^(?!0{3})[0-9]{9}$')])
		});

		if (this.flightService.areTickets) {
			formGroup.patchValue({
				'friendUsername': 'for me',
				'fullname': 'null',
				'passportNumber': '001000000'
			});
		}

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
		if (this.formSeat.get('seats')['controls'][index].get('seatFor').value === 'Me') {
			this.formSeat.get('seats')['controls'][index].patchValue({
				'friendUsername': 'for me',
				'fullname': 'null',
				'passportNumber': '001000000'
			});
		}
		else {
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
			'passportNumber': '001000000'
		});
	}

	onSubmit() {
		let passengers: Passenger[] = [];

		this.formSeat.get('seats')['controls'].forEach(element => {
			passengers.push(new Passenger(
				element.get('rowId').value,
				element.get('seatId').value,
				element.get('friendUsername').value,
				element.get('fullname').value,
				element.get('passportNumber').value
			));
		});

		if (passengers.length !== 0) {
			this.flightService.reserveFlight(this.flightId, passengers).subscribe(
				res => {
					this.toastr.success('Flight reservation successfully made', 'Reservation');
					this.router.navigate(['reservations']);
				}
			);
		}
	}

	onChooseNewSeat() {
		let formControl = this.formSeat.get('seats')['controls'][0];
		let rowId = formControl.get('rowId').value;
		let seatId = formControl.get('seatId').value;

		let input = <HTMLInputElement>document.getElementById(rowId + '+' + seatId);
		input.checked = false;

		this.formSeat = new FormGroup({
			'seats': new FormArray([])
		});
	}
}