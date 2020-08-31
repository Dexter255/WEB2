import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../server.service';

@Component({
	selector: 'app-admin-password',
	templateUrl: './admin-password.component.html',
	styleUrls: ['./admin-password.component.css']
})
export class AdminPasswordComponent implements OnInit {
	passwordForm: FormGroup;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		private serverService: ServerService) { }

	ngOnInit(): void {
		let id = this.route.parent.snapshot.params['id'];
		this.passwordForm = new FormGroup({
			'id': new FormControl(id),
			'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
			'passwordConfirmed': new FormControl(null, Validators.required)
		}, this.comparePasswords)
	}

	onSubmit(){
		let body: any = {
			'id': this.passwordForm.get('id').value,
			'password': this.passwordForm.get('password').value
		};
		this.serverService.setNewPasswordForAdmin(body).subscribe(
			res => {
				this.toastr.success(res['message'], 'Email');
				this.router.navigate(['login']);
			},
			err => {}
		);
	}

	comparePasswords(formGroup: FormGroup): { [error: string]: boolean } {
		if (formGroup.get('password').value !== null && formGroup.get('passwordConfirmed').value !== null) {
			if (formGroup.get('password').value !== formGroup.get('passwordConfirmed').value) {
				return { 'notMatch': true };
			}
		}

		return null;
	}
}
