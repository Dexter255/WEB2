import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TicketService } from 'src/app/components/ticket.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public ticketService: TicketService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let ticketId = +params['id'];

      this.ticketService.getTicket(ticketId).subscribe();
    });
  }

  convertDate(dateAndTime: Date): string {
    let dateTime = dateAndTime.toLocaleString();
    let dateSplited = dateTime.split('T')[0].split('-');

    return dateSplited[2] + '-' + dateSplited[1] + '-' + dateSplited[0] + ' ' + dateTime.split('T')[1];
  }
}
