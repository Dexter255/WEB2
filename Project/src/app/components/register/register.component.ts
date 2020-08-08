import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
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
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'fullname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'email': new FormControl(null, [Validators.required, Validators.email, this.checkEmail]),
      'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'number': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), this.comparePasswords]),
      'passwordConfirmed': new FormControl(null, [Validators.required, , this.comparePasswords])
    });
  }

  onSubmit() {
    let user = new User(
      this.registerForm.get('fullname').value.trim(),
      this.registerForm.get('username').value.replace(/\s/g, ''),
      this.registerForm.get('email').value.trim(),
      this.registerForm.get('address').value.trim(),
      this.registerForm.get('number').value.trim(),
      this.registerForm.get('password').value,
      UserType.User
    );


    this.serverService.register(user).subscribe(
      (res: any) => {
        if(res.Succeeded){
          this.router.navigate(['login']);
        }
        else{
          res.Errors.forEach(element => {
            if(element.Code === 'DuplicateUserName'){
              alert("Username vec zauzet. PROMENITI.");
            }
          });
        }
      }, 
      err => {
        console.log(err);
      }
    )
  }

  // doraditi
  checkEmail(formControl: FormControl): { [error: string]: boolean } | null {
    if (formControl.value === 'mihajlo@gmail.com') {
      return { 'emailIsInvalid': true };
    } else {
      return null;
    }
  }

  comparePasswords(control: FormControl): { [error: string]: boolean } | null {
    let password: string;
    let passwordConfirmed: string;

    try {
      password = control.parent.get('password').value;
      passwordConfirmed = control.parent.get('passwordConfirmed').value;

      if(password !== null && passwordConfirmed != null){
        if(password !== passwordConfirmed)
          return {'notMatch': true };

        return null;
      }
    }
    catch (Error) {

    }

    return null;
  }
}
