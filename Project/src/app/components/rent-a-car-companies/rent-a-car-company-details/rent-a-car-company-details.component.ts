import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RacCompanyService } from '../../rac-company.service';

@Component({
	selector: 'app-rent-a-car-company-details',
	templateUrl: './rent-a-car-company-details.component.html',
	styleUrls: ['./rent-a-car-company-details.component.css']
})
export class RentACarCompanyDetailsComponent implements OnInit {

	constructor(private route: ActivatedRoute,
		private router: Router,
		public racCompanyService: RacCompanyService) { }

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			let companyId = +params['id'];
			this.racCompanyService.getRacCompany(companyId).subscribe(
				res => { },
				err => { }
			);
		});
	}

	onSeeVehicles(companyId: number) {
		this.router.navigate(['vehicles', companyId]);
	}
}
