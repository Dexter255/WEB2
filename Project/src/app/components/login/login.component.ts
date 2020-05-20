import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = false;

  constructor(private router: Router,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
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
        // if(err.status === 400)
        console.log(err);
      }
    );
  }

}
