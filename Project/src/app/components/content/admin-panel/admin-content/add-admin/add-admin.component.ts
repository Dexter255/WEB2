import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminsService } from '../admins.service';
import { ActivatedRoute, Router } from '@angular/router';
import { korisnik } from 'src/app/models/korisnik/korisnik';
import { UserType } from 'src/app/models/korisnik/user-type.model';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  addAdmin: FormGroup;

  constructor(private adminsService: AdminsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.addAdmin = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'lastname': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'address': new FormControl(null, Validators.required),
      'number': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    })
  }

  onSubmit(){
    let putanja = this.route.snapshot.url[0].path;

    let user = new korisnik(
      this.addAdmin.get('name').value,
      this.addAdmin.get('lastname').value,
      this.addAdmin.get('email').value,
      this.addAdmin.get('address').value,
      this.addAdmin.get('number').value,
      '123123',
      UserType.None
    );

    switch(putanja){
      case 'add-rac-companies-admin':
        user.setType(UserType.Admin_RentACarCompanies);
        this.adminsService.addRentACarCompanyAdmin(user);
        this.router.navigate(['../', 'rac-companies-admins'], {relativeTo: this.route});
        break;

      case 'add-airlines-admin':
        user.setType(UserType.Admin_Airlines);
        this.adminsService.addAirlinesAdmin(user);
        this.router.navigate(['../', 'airlines-admins'], {relativeTo: this.route});
        break;
    }
  }
}
