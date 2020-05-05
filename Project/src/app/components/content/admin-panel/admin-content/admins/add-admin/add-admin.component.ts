import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { korisnik } from 'src/app/models/korisnik/korisnik';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserType } from 'src/app/models/korisnik/user-type.model';
import { AdminsService } from '../admins.service';

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

  constructor(private adminsService: AdminsService,
              private route: ActivatedRoute,
              private router: Router) { }

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
          let user: korisnik;

          // posle nece trebati
          switch (this.route.snapshot['_routerState'].url.split('/')[2]) {
            case "rac-companies-admins":
              user = this.adminsService.getRentACarCompaniesAdmin(this.id);
              break;
      
            case "airlines-admins":
              user = this.adminsService.getAirlinesAdmin(this.id);
              break;
          }

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
    let user = new korisnik(this.addAdmin.get('name').value,
      this.addAdmin.get('lastname').value,
      this.addAdmin.get('email').value,
      this.addAdmin.get('address').value,
      this.addAdmin.get('number').value,
      '123123',
      UserType.None);

    // kasnije nece biti potreban
    switch (this.route.snapshot['_routerState'].url.split('/')[2]) {
      case "rac-companies-admins":
        user.setType(UserType.Admin_RentACarCompanies);

        if(this.edit)
          this.adminsService.updateRentACarCompanyAdmin(this.id, user);
        else
          this.adminsService.addRentACarCompanyAdmin(user);
        break;

      case "airlines-admins":
        user.setType(UserType.Admin_Airlines);

        if(this.edit)
          this.adminsService.updateAirlinesAdmin(this.id, user);
        else
          this.adminsService.addAirlinesAdmin(user);
        break;
    }

    if(this.edit)
      this.router.navigate(['../../'], { relativeTo: this.route});
    else
      this.router.navigate(['../'], { relativeTo: this.route});
  }
}
