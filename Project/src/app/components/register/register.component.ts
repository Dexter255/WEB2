import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ServerService } from '../server.service';
import { UserType } from 'src/app/models/korisnik/user-type.model';
import { User } from 'src/app/models/korisnik/user.model';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	public registerForm: FormGroup;

	constructor(private router: Router,
		private toastr: ToastrService,
		private serverService: ServerService) { }

	ngOnInit(): void {
		this.registerForm = new FormGroup({
			'fullname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'passportNumber': new FormControl(null, [Validators.required, Validators.pattern('^(?!0{3})[0-9]{9}$')]),
			'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'number': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
			'passwords': new FormGroup({
				'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
				'passwordConfirmed': new FormControl(null, Validators.required)
			}, this.comparePasswords)
		});
	}

	onSubmit() {
		let user = new User(
			this.registerForm.get('fullname').value.trim(),
			this.registerForm.get('username').value.replace(/\s/g, ''),
			this.registerForm.get('email').value.trim(),
			this.registerForm.get('address').value.trim(),
			this.registerForm.get('number').value,
			UserType.User,
			this.registerForm.get('passwords').get('password').value,
			this.registerForm.get('passportNumber').value
		);

		this.serverService.register(user).subscribe(
			(res: any) => {
				if (res.Succeeded) {
					this.toastr.success('You have successfully registered.', 'Register');
					this.router.navigate(['login']);
				}
				else {
					res.Errors.forEach(element => {
						if (element.Code === 'DuplicateUserName') {
							this.toastr.error('Username is already taken.', 'User');
						}
						else if (element.Code === 'DuplicateEmail') {
							this.toastr.error('Email is already taken.', 'User');
						}
					});
				}
			}
		)
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
