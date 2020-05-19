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
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    this.serverService.login(
      this.loginForm.get('email').value.trim(),
      this.loginForm.get('password').value.trim()
    ) === false ? this.error = true : this.router.navigate(['']);
  }

}
