import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { korisnik } from 'src/app/models/korisnik/korisnik';
import { ActivatedRoute } from '@angular/router';
import { AdminsService } from '../../admins.service';

@Component({
  selector: '[app-admin]',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() admin: korisnik;
  @Input() id: number;

  constructor(private route: ActivatedRoute,
              private adminsService: AdminsService) { }

  ngOnInit(): void {
  }

  onDelete(){
    // posle moze da se izbrise
    switch(this.route.snapshot['_routerState'].url.split('/')[2]){
      case 'rac-companies-admins':
        this.adminsService.deleteRentACarCompanyAdmin(this.id);
        break;

      case 'airlines-admins':
        this.adminsService.deleteAirlineAdmin(this.id);
        break;
    }
  }
}
