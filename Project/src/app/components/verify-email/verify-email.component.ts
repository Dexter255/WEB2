import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ServerService } from '../server.service';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		public serverService: ServerService) { }

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			let id = params['id'];

			this.serverService.getRole(id).subscribe(
				(res: any) => {
					if (res['message'] === 'Admin_Airlines' || res['message'] === 'Admin_RentACarCompanies') {
						this.router.navigate(['admin-password'], { relativeTo: this.route, skipLocationChange: true })
					}
					else if (res['message'] === 'User') {
						this.serverService.verityEmail(id).subscribe(
							res => {
								this.toastr.success(res['message'], 'Email');
								this.router.navigate(['login']);
							},
							err => {}
						)
					}
				},
				err => {}
			);
		});
	}

}
