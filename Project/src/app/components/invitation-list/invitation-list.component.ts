import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlightInvitation } from 'src/app/models/flight/flight-invitation.model';
import { Option } from 'src/app/models/flight/option.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.getFlightInvitations().subscribe();
  }

  onFlightInvitationDetails(flight: FlightInvitation){
    this.flightService.invitationFromUser = flight.InvitationFromUser;
    this.router.navigate(['flight', flight.FlightId], { relativeTo: this.route });
  }

  onFlightInvitationAccept(flightId: number){
    this.flightService.acceptFlightInvitation(flightId).subscribe(
      res => {
        this.toastr.success('Invitation was successfully accepted.', 'Reservation');
        this.flightService.getFlightInvitations().subscribe();
      }
    );
  }
  
  onFlightInvitationDecline(flightId: number){
    this.flightService.declineFlightInvitation(flightId).subscribe(
      res => {
        this.toastr.success('Invitation was successfully declined.', 'Reservation');
        this.flightService.getFlightInvitations().subscribe();
      }
    );
  }

  convertEnum(option: Option){
    return Option[option];
  }
}
