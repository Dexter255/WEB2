import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AdminService } from 'src/app/components/admin.service';
import { UserType } from 'src/app/models/korisnik/user-type.model';
import { User } from 'src/app/models/korisnik/user.model';
import { ServerService } from 'src/app/components/server.service';

@Component({
	selector: 'app-add-admin',
	templateUrl: './add-admin.component.html',
	styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
	addAdmin: FormGroup;
	show: boolean = false;
	header: string = "Add admin";
	edit: boolean = false;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		private adminsService: AdminService,
		private serverService: ServerService) { }

	ngOnInit(): void {
		let adminOf: UserType;

		switch (this.route.snapshot['_routerState'].url.split('/')[2]) {
			case "rac-company-admins":
				adminOf = UserType.Admin_RentACarCompanies;
				break;

			case "airline-admins":
				adminOf = UserType.Admin_Airlines;
				break;
		}

		this.addAdmin = new FormGroup({
			'type': new FormControl(UserType[adminOf]),
			'fullname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'number': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
		});

		switch (this.route.snapshot['_routerState'].url.split('/')[3]) {
			case 'add':
				this.show = true;
				break;

			case 'edit':
				this.route.params.subscribe((params: Params) => {
					this.header = "Edit admin";
					let username = params['username'];
					this.edit = true;

					let admin: User;
					this.adminsService.getAdmin(username).subscribe(
						res => {
							admin = res as User;

							this.addAdmin.setValue({
								'type': UserType[adminOf],
								'fullname': admin.Fullname,
								'username': admin.Username,
								'email': admin.Email,
								'address': admin.Address,
								'number': admin.Number,
							});
							this.show = true;
						},
						err => {}
					);
				});
				break;
		}
	}

	onSubmit() {
		let adminOf;

		adminOf = UserType[this.addAdmin.get('type').value];

		let admin = new User(
			this.addAdmin.get('fullname').value.trim(),
			this.addAdmin.get('username').value.trim(),
			this.addAdmin.get('email').value.trim(),
			this.addAdmin.get('address').value.trim(),
			this.addAdmin.get('number').value,
			adminOf,
			'defaultPassword');

		if (this.edit) {
			this.adminsService.updateAdmin(admin).subscribe(
				res => {
					this.toastr.success('Admin was successfully edited.', 'Admin');
					this.router.navigate(['../../'], { relativeTo: this.route });
				}
			);
		}
		else {
			this.serverService.register(admin).subscribe(
				(res: any) => {
					if (res.Succeeded) {
						this.toastr.success('Admin was successfully added.', 'Admin');
						this.router.navigate(['../'], { relativeTo: this.route });
					}
					else {
						res.Errors.forEach(element => {
							if (element.Code === 'DuplicateUserName') {
								this.toastr.error('Username is already taken.', 'Admin');
							}
							else if (element.Code === 'DuplicateEmail') {
								this.toastr.error('Email is already taken.', 'Admin');
							}
						});
					}
				}
			);
		}
	}
}