import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RacCompanyService } from 'src/app/components/rac-company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-rac-company-list',
	templateUrl: './rac-company-list.component.html',
	styleUrls: ['./rac-company-list.component.css']
})
export class RacCompanyListComponent implements OnInit {

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		public racCompanyService: RacCompanyService) { }

	ngOnInit(): void {
		this.racCompanyService.getRacCompanies().subscribe();
	}

	onAddRacCompany() {
		this.router.navigate(['add'], { relativeTo: this.route });
	}

	onDeleteRacCompany(companyId: number) {
		this.racCompanyService.deleteRacCompany(companyId).subscribe(
			res => {
				this.toastr.success('Rent a car company was successfully deleted', 'Rent a car company');
				this.racCompanyService.getRacCompanies().subscribe();
			},
			err => {
				this.toastr.error(err.error['message'], 'Rent a car company');
			}
		);
	}

	onEditRacCompany(companyId: number) {
		this.router.navigate(['edit', companyId], { relativeTo: this.route });
	}

	onDetailsRacCompany(companyId: number) {
		this.router.navigate(['details', companyId], { relativeTo: this.route });
	}

	onSeeVehicles(companyId: number) {
		this.router.navigate([companyId, 'vehicles'], { relativeTo: this.route });
	}
}
