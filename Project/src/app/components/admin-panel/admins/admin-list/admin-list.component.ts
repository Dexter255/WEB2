import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminService } from 'src/app/components/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    public adminService: AdminService) { }

  ngOnInit(): void {
    switch (this.route.snapshot['_routerState'].url.split('/')[2]) {
      case 'rac-company-admins':
        this.adminService.getRacCompanyAdmins().subscribe();
        break;

      case 'airline-admins':
        this.adminService.getAirlineAdmins().subscribe();
        break;
    }
  }

  onDeleteAdmin(id: number) {
    this.adminService.deleteAdmin(id).subscribe(
      res => {
        this.adminService.getRacCompanyAdmins().subscribe();
      },
      err => {
        console.log(err);
      }
    );
  }

  onAddAdmin(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }
  
  onEditAdmin(id: number){
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDetailsAdmin(username: string){
    this.router.navigate(['details', username], {relativeTo: this.route});
  }
}
