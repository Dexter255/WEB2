import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public serverService: ServerService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.serverService.logout();
  }
}
