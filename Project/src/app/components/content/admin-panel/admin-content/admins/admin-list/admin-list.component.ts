import { Component, OnInit } from '@angular/core';
import { korisnik } from 'src/app/models/korisnik/korisnik';
import { ActivatedRoute } from '@angular/router';
import { AdminsService } from '../admins.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  admins: korisnik[];

  constructor(private adminsService: AdminsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    switch(this.route.snapshot['_routerState'].url.split('/')[2]){
      case 'rac-companies-admins':
        this.admins = this.adminsService.getRentACarCompaniesAdmins();
        break;

      case 'airlines-admins':
        this.admins = this.adminsService.getAirlinesAdmins();
        break;
    }
  }

}
