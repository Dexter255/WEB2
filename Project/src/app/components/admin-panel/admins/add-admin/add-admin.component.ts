import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/components/admin.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { korisnik } from 'src/app/models/korisnik/korisnik';
import { UserType } from 'src/app/models/korisnik/user-type.model';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  addAdmin: FormGroup;
  edit: boolean = false;
  header: string = "Add admin";
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminsService: AdminService) { }

  ngOnInit(): void {
    // da li je add ili edit
    switch(this.route.snapshot['_routerState'].url.split('/')[3]){
      case 'add':
        this.addAdmin = new FormGroup({
          'name': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'lastname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'address': new FormControl(null, Validators.required),
          'number': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
        })
        break;

      case 'edit':
        this.route.params.subscribe((params: Params) => {
          this.edit = true;
          this.header = "Edit admin";
          this.id = +params['id'];

          let user = this.adminsService.getAdmin(this.id);

          this.addAdmin = new FormGroup({
            'name': new FormControl(user.ime, [Validators.required, Validators.minLength(4)]),
            'lastname': new FormControl(user.prezime, [Validators.required, Validators.minLength(4)]),
            'email': new FormControl(user.email, [Validators.required, Validators.email]),
            'address': new FormControl(user.adresa, Validators.required),
            'number': new FormControl(user.telefon, [Validators.required, Validators.pattern('^[0-9]*$')]),
          })
        });
        break;
    }
  }

  onSubmit() {
    let userType: UserType;

    if(this.edit){
      this.adminsService.updateAdmin(this.id, 
        this.addAdmin.get('name').value, 
        this.addAdmin.get('lastname').value, 
        this.addAdmin.get('email').value,
        this.addAdmin.get('address').value,
        this.addAdmin.get('number').value);
      this.router.navigate(['../../'], { relativeTo: this.route});
    }
    else{
      switch (this.route.snapshot['_routerState'].url.split('/')[2]) {
        case "rac-company-admins":
          userType = UserType.Admin_RentACarCompanies;
          break;
  
        case "airline-admins":
          userType = UserType.Admin_Airlines;
          break;
      }  

      this.adminsService.addAdmin(this.addAdmin.get('name').value,
        this.addAdmin.get('lastname').value,
        this.addAdmin.get('email').value,
        this.addAdmin.get('address').value,
        this.addAdmin.get('number').value,
        userType);
      this.router.navigate(['../'], { relativeTo: this.route});
    }
  }

}
