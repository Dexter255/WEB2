import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ServerService } from '../server.service';
import { User } from 'src/app/models/korisnik/user.model';
import { Router } from '@angular/router';
import { UserType } from 'src/app/models/korisnik/user-type.model';
import { Friend } from 'src/app/models/korisnik/friend.model';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfile implements OnInit {
	editUser: FormGroup;
	editPassword: FormGroup;
	searchUser: FormGroup;
	selectedFile: File;
	imageUrl: string | ArrayBuffer;
	show: boolean;

	constructor(private router: Router,
		public serverService: ServerService) { }

	ngOnInit(): void {
		this.imageUrl = 'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';

		this.editUser = new FormGroup({
			'fullname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'passportNumber': new FormControl(null),
			'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'number': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
		});

		this.serverService.getUserProfile().subscribe(
			(res: User) => {
				this.editUser.setValue({
					'fullname': res.Fullname,
					'username': res.Username,
					'email': res.Email,
					'passportNumber': res.PassportNumber,
					'address': res.Address,
					'number': res.Number
				});

				this.show = true;
			},
			err => {
				this.show = true;
				console.log(err);
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
		if(formGroup.get('newPassword').value !== null && formGroup.get('reentered').value !== null){
		  if(formGroup.get('newPassword').value !== formGroup.get('reentered').value){
			return { 'notMatch': true };
		  }
		}
		
		return null;
	  }

	onSubmitUser() {
		let user = new User(
			this.editUser.get('fullname').value.trim(),
			this.editUser.get('username').value.trim(),
			this.editUser.get('email').value.trim(),
			this.editUser.get('address').value.trim(),
			this.editUser.get('number').value,
			'123123',
			UserType.User);

		this.serverService.updateUser(user).subscribe(
			res => {
				this.router.navigate(['user-profile']);
			},
			err => {
				console.log(err);
			}
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

	onSubmitPassword(){
		let body = {
			'OldPassword': this.editPassword.get('oldPassword').value.trim(),
			'NewPassword': this.editPassword.get('passwordGroup').get('newPassword').value
		  };
		this.serverService.changePassword(body).subscribe(
			res => {
				this.router.navigate(['user-profile']);
			},
			err => {
				console.log(err);
			}
		);
	}
}
