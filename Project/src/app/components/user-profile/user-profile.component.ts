import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ServerService } from '../server.service';
import { User } from 'src/app/models/korisnik/user.model';
import { UserType } from 'src/app/models/korisnik/user-type.model';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfile implements OnInit {
	editUser: FormGroup;
	editPassword: FormGroup;
	selectedFile: File;
	imageUrl: string | ArrayBuffer;
	show: boolean = false;

	constructor(private router: Router,
		private toastr: ToastrService,
		public serverService: ServerService) { }

	ngOnInit(): void {
		this.imageUrl = 'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';

		this.serverService.getUserProfile().subscribe(
			(res: User) => {
				this.editUser = new FormGroup({
					'fullname': new FormControl(res.Fullname, [Validators.required, Validators.minLength(4)]),
					'username': new FormControl(res.Username),
					'email': new FormControl(res.Email),
					'passportNumber': new FormControl(res.PassportNumber, [Validators.required, Validators.pattern('^(?!0{3})[0-9]{9}$')]),
					'address': new FormControl(res.Address, [Validators.required, Validators.minLength(4)]),
					'number': new FormControl(res.Number, [Validators.required, Validators.pattern('^[0-9]*$')])
				});
				this.show = true;
			}
		);

		this.editPassword = new FormGroup({
			'oldPassword': new FormControl(null, Validators.required),
			'passwordGroup': new FormGroup({
				'newPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
				'reentered': new FormControl(null, Validators.required)
			}, this.comparePasswords)
		});
	}

	comparePasswords(formGroup: FormGroup): { [error: string]: boolean } {
		if (formGroup.get('newPassword').value !== null && formGroup.get('reentered').value !== null) {
			if (formGroup.get('newPassword').value !== formGroup.get('reentered').value) {
				return { 'notMatch': true };
			}
		}

		return null;
	}

	onSubmitUser() {
		let user = new User(
			this.editUser.get('fullname').value,
			this.editUser.get('username').value,
			this.editUser.get('email').value.trim(),
			this.editUser.get('address').value.trim(),
			this.editUser.get('number').value,
			UserType.User);

		this.serverService.updateUser(user).subscribe(
			res => {
				this.toastr.success('User profile successfully updated.', 'User');
			},
			err => {}
		);
	}

	onFileChange(event) {
		this.selectedFile = event.target.files[0];

		let reader = new FileReader();

		reader.onload = (event: any) => {
			this.imageUrl = event.target.result;
		};

		reader.readAsDataURL(this.selectedFile);
	}

	onSubmitPassword() {
		let body = {
			'OldPassword': this.editPassword.get('oldPassword').value.trim(),
			'NewPassword': this.editPassword.get('passwordGroup').get('newPassword').value
		};
		this.serverService.changePassword(body).subscribe(
			res => {
				this.toastr.success('Password was successfully changed.', 'Password');
				this.editPassword.setValue({
					'oldPassword': null,
					'passwordGroup': {
						'newPassword': null,
						'reentered': null
					}
				});
			},
			err => {
				this.toastr.error(err.error['message'], 'Password');
			}
		);
	}
}
