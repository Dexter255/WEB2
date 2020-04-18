import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public serverService: ServerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.serverService.logout();
    this.router.navigate(['']);
  }
}
