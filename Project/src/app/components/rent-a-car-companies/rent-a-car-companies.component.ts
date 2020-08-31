import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RacCompanyService } from '../rac-company.service';

@Component({
	selector: 'app-rent-a-car-companies',
	templateUrl: './rent-a-car-companies.component.html',
	styleUrls: ['./rent-a-car-companies.component.css']
})
export class RentACarCompaniesComponent implements OnInit {
	searchRacCompany: FormGroup;

	constructor(public racCompanyService: RacCompanyService) { }

	ngOnInit(): void {
		this.searchRacCompany = new FormGroup({
			'companyName': new FormControl(null),
			'address': new FormControl(null),
			'fromDate': new FormControl(null),
			'toDate': new FormControl(null)
		})

		this.racCompanyService.getRacCompanies().subscribe();
	}

	onSortChange(sortBy: string) {
		if (sortBy === '0') {
			this.racCompanyService.racCompanies = this.racCompanyService.racCompanies.sort((a, b) => (a.CompanyName > b.CompanyName) ? 1 : -1);
		}
		else if (sortBy === '1') {
			this.racCompanyService.racCompanies = this.racCompanyService.racCompanies.sort((a, b) => (a.CompanyName > b.CompanyName) ? -1 : 1);
		}
		else if (sortBy === '2') {
			this.racCompanyService.racCompanies = this.racCompanyService.racCompanies.sort((a, b) => (a.Address > b.Address) ? 1 : -1);
		}
		else if (sortBy === '3') {
			this.racCompanyService.racCompanies = this.racCompanyService.racCompanies.sort((a, b) => (a.Address > b.Address) ? -1 : 1);
		}
	}

	onSearch() {
		let companyName = this.searchRacCompany.get('companyName').value;
		let address = this.searchRacCompany.get('address').value;
		let vehicleNeededFrom = this.searchRacCompany.get('fromDate').value;
		let vehicleNeededTo = this.searchRacCompany.get('toDate').value;

		let body: any = {};

		if (companyName !== null)
			body.CompanyName = companyName;
		if (address !== null)
			body.Address = address;
		if(vehicleNeededFrom !== null)
			body.VehicleNeededFrom = vehicleNeededFrom;
		if(vehicleNeededTo !== null)
			body.VehicleNeededTo = vehicleNeededTo;

		this.racCompanyService.searchRacCompanies(body).subscribe();
	}

	onReset() {
		this.racCompanyService.getRacCompanies().subscribe(
			res => {
			  this.searchRacCompany.setValue({
				'companyName': null,
				'address': null,
				'fromDate': null,
				'toDate': null,
			  });
			}
		  );
	}
}
