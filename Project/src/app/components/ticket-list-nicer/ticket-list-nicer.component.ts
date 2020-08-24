import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ticket-list-nicer',
  templateUrl: './ticket-list-nicer.component.html',
  styleUrls: ['./ticket-list-nicer.component.css']
})
export class TicketListNicerComponent implements OnInit {
  searchTickets: FormGroup;
  airlineId: number;

  constructor(private route: ActivatedRoute, 
    public ticketService: TicketService) { }

  ngOnInit(): void {
    this.searchTickets = new FormGroup({
      'startDestination': new FormControl(null),
      'endDestination': new FormControl(null),
      'startDate': new FormControl(null),
      'ticketPrice': new FormControl(null)
    });
    
    this.route.params.subscribe((params: Params) => {
      this.airlineId = +params['id'];
      this.ticketService.getTickets(this.airlineId).subscribe();
    });
  }

  onSearch() {
    let startDestination = this.searchTickets.get('startDestination').value;
    let endDestination = this.searchTickets.get('endDestination').value;
    let startDate = this.searchTickets.get('startDate').value;
    let ticketPrice = this.searchTickets.get('ticketPrice').value;

    let body: any = {};

    if (startDestination !== null)
      body.StartDestination = startDestination;
    if (endDestination !== null)
      body.EndDestination = endDestination;
    if (startDate !== null)
      body.StartDate = startDate;
    if (ticketPrice !== null)
      body.TicketPrice = ticketPrice;

    this.ticketService.searchTickets(this.airlineId, body).subscribe();
  }

  onReset() {
    this.ticketService.getTickets(this.airlineId).subscribe(
      res => {
        this.searchTickets.setValue({
          'startDestination': null,
          'endDestination': null,
          'startDate': null,
          'ticketPrice': null
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  
  onSortChange(sortBy: string) {
    if (sortBy === '0') {
      this.ticketService.tickets = this.ticketService.tickets.sort((a, b) => (a.TicketPrice > b.TicketPrice) ? 1 : -1);
    }
    else if (sortBy === '1') {
      this.ticketService.tickets = this.ticketService.tickets.sort((a, b) => (a.TicketPrice > b.TicketPrice) ? -1 : 1);
    }
  }
}
