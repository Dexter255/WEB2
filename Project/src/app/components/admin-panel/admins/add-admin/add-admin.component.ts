import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/components/admin.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserType } from 'src/app/models/korisnik/user-type.model';
import { User } from 'src/app/models/korisnik/user.model';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  addAdmin: FormGroup;
  show: boolean = false;
  header: string = "Add admin";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private adminsService: AdminService) { }

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
          'id': new FormControl(0),
          'type': new FormControl(UserType[adminOf]),
          'name': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'lastname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'number': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
        });
        this.show = true;
        break;

      case 'edit':
        this.route.params.subscribe((params: Params) => {
          this.header = "Edit admin";
          let id = +params['id'];

          let admin;
          this.adminsService.getAdmin(id).subscribe(
            res => {
              admin = res as User;

              this.addAdmin = new FormGroup({
                'id': new FormControl(id),
                'type': new FormControl(UserType[adminOf]),
                'name': new FormControl(admin.Name, [Validators.required, Validators.minLength(4)]),
                'lastname': new FormControl(admin.Lastname, [Validators.required, Validators.minLength(4)]),
                'email': new FormControl(admin.Email, [Validators.required, Validators.email]),
                'address': new FormControl(admin.Address, [Validators.required, Validators.minLength(4)]),
                'number': new FormControl(admin.Number, [Validators.required, Validators.pattern('^[0-9]*$')]),
              });
              this.show = true;
            },
            err => {
              console.log(err);
            }
          )
        });
        break;
    }
  }

  onSubmit() {
    let adminOf;

    adminOf = UserType[this.addAdmin.get('type').value];

    let admin = new User(
      this.addAdmin.get('id').value,
      this.addAdmin.get('name').value.trim(),
      this.addAdmin.get('lastname').value.trim(),
      this.addAdmin.get('email').value.trim(),
      this.addAdmin.get('address').value.trim(),
      this.addAdmin.get('number').value,
      '123123', 
      adminOf);
    
    if (this.addAdmin.get('id').value !== 0) {
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
      this.adminsService.addAdmin(admin).subscribe(
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