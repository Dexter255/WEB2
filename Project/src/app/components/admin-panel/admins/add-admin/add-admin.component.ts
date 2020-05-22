import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/components/admin.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserType } from 'src/app/models/korisnik/user-type.model';
import { User } from 'src/app/models/korisnik/user.model';
import { ServerService } from 'src/app/components/server.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  addAdmin: FormGroup;
  show: boolean = false;
  header: string = "Add admin";
  edit: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private adminsService: AdminService,
    private serverService: ServerService) { }

  ngOnInit(): void {
    let adminOf: UserType;

    switch (this.route.snapshot['_routerState'].url.split('/')[2]) {
      case "rac-company-admins":
        adminOf = UserType.Admin_RentACarCompanies;
        break;

      case "airline-admins":
        adminOf = UserType.Admin_Airlines;
        break;
    }
    
    // da li je add ili edit
    switch (this.route.snapshot['_routerState'].url.split('/')[3]) {
      case 'add':
        this.addAdmin = new FormGroup({
          'type': new FormControl(UserType[adminOf]),
          'fullname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'number': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
        });
        this.show = true;
        break;

      case 'edit':
        this.route.params.subscribe((params: Params) => {
          this.header = "Edit admin";
          let username = params['username'];
          this.edit = true;
          
          let admin;
          this.adminsService.getAdmin(username).subscribe(
            res => {
              admin = res as User;

              this.addAdmin = new FormGroup({
                'type': new FormControl(UserType[adminOf]),
                'fullname': new FormControl(admin.Fullname, [Validators.required, Validators.minLength(4)]),
                'username': new FormControl(admin.Username, [Validators.required, Validators.minLength(4)]),
                'email': new FormControl(admin.Email, [Validators.required, Validators.email]),
                'address': new FormControl(admin.Address, [Validators.required, Validators.minLength(4)]),
                'number': new FormControl(admin.Number, [Validators.required, Validators.pattern('^[0-9]*$')]),
              });
              this.show = true;
            },
            err => {
              console.log(err);
            }
          );
        });
        break;
    }
  }

  onSubmit() {
    let adminOf;

    adminOf = UserType[this.addAdmin.get('type').value];

    let admin = new User(
      this.addAdmin.get('fullname').value.trim(),
      this.addAdmin.get('username').value.trim(),
      this.addAdmin.get('email').value.trim(),
      this.addAdmin.get('address').value.trim(),
      this.addAdmin.get('number').value,
      '123123',
      adminOf);
    
    if (this.edit) {
      this.adminsService.updateAdmin(admin).subscribe(
        res => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      this.serverService.register(admin).subscribe(
        res => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}