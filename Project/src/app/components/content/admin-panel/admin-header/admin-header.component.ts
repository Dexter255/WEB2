import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/components/server.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(public serverService: ServerService) { }

  ngOnInit(): void {
  }

}
