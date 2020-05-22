import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from 'src/app/components/admin.service';

import { User } from 'src/app/models/korisnik/user.model';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {
  admin: User;

  constructor(private route: ActivatedRoute,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let username = params['username'];

      this.adminService.getAdmin(username).subscribe(
        res => {
          this.admin = res as User;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

}
