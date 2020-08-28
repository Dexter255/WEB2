import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-list-nicer',
  templateUrl: './ticket-list-nicer.component.html',
  styleUrls: ['./ticket-list-nicer.component.css']
})
export class TicketListNicerComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public ticketService: TicketService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.ticketService.getTickets(+params['id']).subscribe();
    });
  }

}
