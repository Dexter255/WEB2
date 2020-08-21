import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/components/ticket.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  private airlineId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public ticketService: TicketService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.airlineId = +params['id'];
      this.ticketService.getTickets(this.airlineId).subscribe(
        res => {},
        err => {
          console.log(err);
        }
      );
    });
  }

  onAddTicket() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
  
  onDetailsTicket(ticketId: number){
    this.router.navigate(['details', ticketId], { relativeTo: this.route });
  }

  onEditTicket(ticketId: number){
    this.router.navigate(['edit', ticketId], { relativeTo: this.route });
  }

  onDeleteTicket(ticketId: number){
    this.ticketService.deleteTicket(ticketId).subscribe(
      res => {
        this.ticketService.getTickets(this.airlineId).subscribe();
      },
      err => {
        console.log(err);
      }
    );
  }

  convertDate(dateAndTime: Date): string {
    let dateTime = dateAndTime.toLocaleString();
    let dateSplited = dateTime.split('T')[0].split('-');

    return dateSplited[2] + '-' + dateSplited[1] + '-' + dateSplited[0] + ' ' + dateTime.split('T')[1];
  }
}
