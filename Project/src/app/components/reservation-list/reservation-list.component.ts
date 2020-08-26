import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(public serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getUserProfile().subscribe();
  }

}
