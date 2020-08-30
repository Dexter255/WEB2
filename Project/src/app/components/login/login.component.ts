import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ServerService } from '../server.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(private router: Router,
		private toastr: ToastrService,
		private serverService: ServerService) { }

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			'username': new FormControl(null),
			'password': new FormControl(null)
		});
	}

	onSubmit() {
		var body = {
			'Username': this.loginForm.get('username').value.trim(),
			'Password': this.loginForm.get('password').value
		};
		this.serverService.login(body).subscribe(
			(res: any) => {
				localStorage.setItem('token', res.token);
				this.router.navigate(['']);
			},
			err => {
				this.toastr.error(err.error['message'], 'User');
			}
		);
	}

}
