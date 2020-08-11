import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ServerService } from '../server.service';
import { User } from 'src/app/models/korisnik/user.model';
import { Router } from '@angular/router';
import { UserType } from 'src/app/models/korisnik/user-type.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfile implements OnInit {
  editUser: FormGroup;
  selectedFile: File;
  url: string | ArrayBuffer;
  show: boolean;

  constructor(private router: Router,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.url = 'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';
    
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
  }

  onSubmit(){
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

  onFileChange(event){
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    reader.readAsDataURL(this.selectedFile);
  }

  }
