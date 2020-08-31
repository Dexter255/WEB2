import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RacCompanyService } from 'src/app/components/rac-company.service';
import { Service } from 'src/app/models/rent-a-car/service.model';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { Branch } from 'src/app/models/rent-a-car/branch.model';

@Component({
	selector: 'app-add-rac-company',
	templateUrl: './add-rac-company.component.html',
	styleUrls: ['./add-rac-company.component.css']
})
export class AddRacCompanyComponent implements OnInit {
	addRacCompany: FormGroup;
	header: string = 'Add rent a car company';
	show: boolean = false;

	constructor(private router: Router,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		public racCompanyService: RacCompanyService) { }

	ngOnInit(): void {
		this.addRacCompany = new FormGroup({
			'id': new FormControl(0),
			'companyName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'description': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'services': new FormArray([]),
			'branches': new FormArray([]),
			'rating': new FormControl(0)
		});

		switch (this.route.snapshot['_routerState'].url.split('/')[3]) {
			case 'add':
				this.show = true;
				break;

			case 'edit':
				this.route.params.subscribe((params: Params) => {
					this.header = "Edit rent a car company";
					let companyId = +params['id'];

					let racCompany;
					this.racCompanyService.getRacCompany(companyId).subscribe(
						res => {
							racCompany = res as RentACarCompany;

							this.addRacCompany.setValue({
								'id': companyId,
								'companyName': racCompany.CompanyName, 
								'address': racCompany.Address, 
								'description': racCompany.Description,
								'services': [],
								'branches': [],
								'rating': racCompany.Rating
							});

							racCompany.Services.forEach(element => {
								this.onAddService(element.Description, element.Price.toString());
							});

							racCompany.Branches.forEach(element => {
								this.onAddBranch(element.Address);
							});
							this.show = true;
						},
						err => { }
					);
				});
				break;
		}
	}

	onAddService(service: string = null, price: string = null) {
		let formGroup = new FormGroup({
			'description': new FormControl(service, [Validators.required, Validators.minLength(4)]),
			'price': new FormControl(price, [Validators.required, Validators.pattern('^[0-9]*$')])
		});

		(<FormArray>this.addRacCompany.get('services')).push(formGroup);
	}

	onDeleteService(index: number) {
		(<FormArray>this.addRacCompany.get('services')).removeAt(index);
	}

	onAddBranch(address: string = null) {
		let formControl = new FormControl(address, [Validators.required, Validators.minLength(4)]);

		(<FormArray>this.addRacCompany.get('branches')).push(formControl);
	}

	onDeleteBranch(index: number) {
		(<FormArray>this.addRacCompany.get('branches')).removeAt(index);
	}

	onSubmit() {
		let services: Service[] = [];
		let branches: Branch[] = [];

		this.addRacCompany.get('services').value.forEach(element => {
			services.push(new Service(0, element.description.trim(), +element.price));
		});

		this.addRacCompany.get('branches').value.forEach(element => {
			branches.push(new Branch(0, element.trim()));
		});

		let racCompany = new RentACarCompany(
			this.addRacCompany.get('id').value,
			this.addRacCompany.get('companyName').value.trim(),
			this.addRacCompany.get('address').value.trim(),
			this.addRacCompany.get('description').value.trim(),
			services,
			branches,
			[],
			this.addRacCompany.get('rating').value);

		if (this.addRacCompany.get('id').value !== 0) {
			this.racCompanyService.updateRacCompany(racCompany).subscribe(
				res => {
					this.toastr.success('Rent a car company was successfully edited.', 'Rent a car company');
					this.router.navigate(['../../'], { relativeTo: this.route });
				},
				err => {}
			)
		}
		else {
			this.racCompanyService.addRacCompany(racCompany).subscribe(
				res => {
					this.toastr.success('Rent a car company was successfully added.', 'Rent a car company');
					this.router.navigate(['../'], { relativeTo: this.route });
				}
			)
		}
	}
}