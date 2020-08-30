import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AdminService } from 'src/app/components/admin.service';

@Component({
	selector: 'app-admin-details',
	templateUrl: './admin-details.component.html',
	styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {

	constructor(private route: ActivatedRoute,
		public adminService: AdminService) { }

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			let username = params['username'];

			this.adminService.getAdmin(username).subscribe(
				res => {},
				err => {}
			);
		});
	}

}
