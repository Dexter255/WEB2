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
  user: User;

  constructor(private route: ActivatedRoute,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = +params['id'];

      this.adminService.getAdmin(id).subscribe(
        res => {
          this.user = res as User;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

}
