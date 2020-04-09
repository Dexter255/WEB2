import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'name': new FormControl(),
      'lastname': new FormControl(),
      'email': new FormControl(),
      'mobilePhone': new FormControl(),
      'address': new FormControl(),
      'password': new FormControl(),
      'passwordConfirmed': new FormControl(),
    });
  }

}
