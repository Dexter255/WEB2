import { Component, OnInit } from '@angular/core';
import { korisnik } from 'src/app/models/korisnik/korisnik';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from 'src/app/components/admin.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {
  user: korisnik;

  constructor(private route: ActivatedRoute,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = +params['id'];

      this.user = this.adminService.getAdmin(id);
    });
  }

}
