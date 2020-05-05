import { Component, OnInit } from '@angular/core';
import { korisnik } from 'src/app/models/korisnik/korisnik';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminsService } from '../admins.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {
  user: korisnik;

  constructor(private route: ActivatedRoute,
              private adminsService: AdminsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = +params['id'];
      
      // posle nece trebati
      switch (this.route.snapshot['_routerState'].url.split('/')[2]) {
        case "rac-companies-admins":
          this.user = this.adminsService.getRentACarCompaniesAdmin(id);
          break;
  
        case "airlines-admins":
          this.user = this.adminsService.getAirlinesAdmin(id);
          break;
      }
    });
  }

}
