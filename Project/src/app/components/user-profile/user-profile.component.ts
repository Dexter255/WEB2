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
	searchUser: FormGroup;
	selectedFile: File;
	imageUrl: string | ArrayBuffer;
	show: boolean;

	constructor(private router: Router,
		public serverService: ServerService) { }

	ngOnInit(): void {
		this.serverService.friends = [];
		this.serverService.friendRequests = [];
		this.serverService.friendRequestsSent = [];

		this.imageUrl = 'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';

		this.editUser = new FormGroup({
			'fullname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
			'number': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
		});

		this.serverService.getUserProfile().subscribe(
			(res: User) => {
				this.editUser.setValue({
					'fullname': res.Fullname,
					'username': res.Username,
					'email': res.Email,
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

		this.searchUser = new FormGroup({
			'username': new FormControl(null)
		});
	}

	onSubmit() {
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

	//#region Friend
	onSearch() {
		if (this.searchUser.get("username").value !== null) {
			this.serverService.searchUsers(this.searchUser.get("username").value).subscribe(
				(res: Friend[]) => {
					this.serverService.friends.length = 0;
					this.serverService.friends = res;
				},
				err => {
					console.log(err);
				}
			)
		}
	}

	onReset() {
		this.resetForm();
		this.serverService.friends.length = 0;
		this.serverService.getUserProfile().subscribe();
	}

	resetForm() {
		this.searchUser.setValue({
			'username': null
		});
	}

	onSendFriendRequest(username: string) {
		this.serverService.sendFriendRequest(username).subscribe();
		this.resetForm();
	}

	onCancelFriendRequest(username: string) {
		this.serverService.cancelFriendRequest(username).subscribe();
		this.resetForm();
	}

	onAcceptFriendRequest(username: string) {
		this.serverService.acceptFriendRequest(username).subscribe();
		this.resetForm();
	}
	
	onDeclineFriendRequest(username: string) {
		this.serverService.declineFriendRequest(username).subscribe();
	}

	onDeleteFriend(username: string) {
		this.serverService.deleteFriend(username).subscribe();
		this.resetForm();
	}

	toString(friend: Friend): string {
		return 'Username: ' + friend.Username +
			'\nFullname: ' + friend.Fullname +
			'\nEmail: ' + friend.Email +
			'\nAddress: ' + friend.Address +
			'\nPhone number: ' + friend.Number;
	}
	//#endregion

	onFileChange(event) {
		this.selectedFile = event.target.files[0];

		let reader = new FileReader();

		reader.onload = (event: any) => {
			this.imageUrl = event.target.result;
		};

		reader.readAsDataURL(this.selectedFile);
	}

}
