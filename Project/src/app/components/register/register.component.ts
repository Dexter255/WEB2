import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { korisnik } from 'src/app/models/korisnik/korisnik';
import { UserType } from 'src/app/models/korisnik/user-type.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
    
  constructor(private router: Router,
    private serverService: ServerService) { 
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'lastname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'email': new FormControl(null, [Validators.required, Validators.email, this.checkEmail]),
      'city': new FormControl(null, Validators.required),
      'number': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'passwordConfirmed': new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    let user = new korisnik(
      this.registerForm.get('name').value,
      this.registerForm.get('lastname').value,
      this.registerForm.get('email').value,
      this.registerForm.get('city').value,
      this.registerForm.get('number').value,
      this.registerForm.get('password').value,
      UserType.User
    )

    this.serverService.register(user);

    alert("You have successfully registered!");

    this.router.navigate(['login']);
  }

  checkEmail(formControl: FormControl): { [error: string]: boolean } | null {
    if (formControl.value === 'mihajlo@gmail.com') {
      return { 'emailIsInvalid': true };
    } else {
      return null;
    }
  }

  comparePasswords(formControl: FormControl): { [error: string]: boolean } | null {
    // if(this.registerForm.get('password').value === null){
    //   return null
    // }
    return null;
  }
}
