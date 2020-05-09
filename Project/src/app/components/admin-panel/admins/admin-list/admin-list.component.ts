import { Component, OnInit } from '@angular/core';
import { korisnik } from 'src/app/models/korisnik/korisnik';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/components/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  admins: korisnik[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
    switch (this.route.snapshot['_routerState'].url.split('/')[2]) {
      case 'rac-company-admins':
        this.admins = this.adminService.getRentACarCompanyAdmins();
        break;

      case 'airline-admins':
        this.admins = this.adminService.getAirlineAdmins();
        break;
    }
  }

  onDeleteAdmin(id: number) {
    this.adminService.deleteAdmin(id);
    let index = this.admins.indexOf(this.admins.find(x => x.id === id));
    this.admins.splice(index, 1);
  }

  onAddAdmin(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }
  
  onEditAdmin(id: number){
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDetailsAdmin(id: number){
    this.router.navigate(['details', id], {relativeTo: this.route});
  }
}
