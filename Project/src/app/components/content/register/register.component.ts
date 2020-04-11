import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
    
  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email, this.checkEmail]),
      'password': new FormControl(null, [Validators.required, this.checkPassword]),
      'passwordConfirmed': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    //console.log(this.registerForm.get('email'));
    //console.log(this.registerForm.get('password').value.length);
    //console.log(this.registerForm.get('passwordConfirmed'));
    console.log(this.registerForm.get('password'));
  }

  checkEmail(formControl: FormControl): { [s: string]: boolean } {
    if (formControl.value === 'mihajlo@gmail.com') {
      return { 'emailIsInvalid': true };
    } else {
      return null;
    }
  }

  // ne moze biti kraca od 6 karaktera
  checkPassword(formControl: FormControl): { [s: string]: boolean }{
    if(formControl.value !== null){
      if(formControl.value.length < 6){
        return { 'passwordTooShort': true };
      }
    }
    else{
      return null;
    }
  }

  // mora da se podudara sa sifrom
  checkPasswordConfirmed(formControl: FormControl): { [s: string]: boolean } {
    // if(this.registerForm.get('password').value !== null){
    //   // if(this.registerForm.get('password').value !== formControl.value){
    //   //   return { 'passwordNotMatch': true };
    //   // }
    // }
    // else{
    //   return null;
    // }
    return null;
  }
}
