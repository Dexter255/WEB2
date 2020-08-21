import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TicketService } from 'src/app/components/ticket.service';
import { QuickReservationTicket } from 'src/app/models/flight/quick-reservation-ticket.model';
import { Destination } from 'src/app/models/flight/destination.model';
import { AirlineService } from 'src/app/components/airline.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  addTicket: FormGroup;
  destinations: Destination[];
  header: string = "Add ticket";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private airlineService: AirlineService,
    private ticketService: TicketService) { }

  ngOnInit(): void {
    let airlineId = +this.route.parent.snapshot.params['id'];

    this.airlineService.getDestinations(airlineId).subscribe(
      (res: Destination[]) => {
        this.destinations = res;
      },
      err => {
        console.log(err);
      }
    );
    
    this.addTicket = new FormGroup({
      'airlineId': new FormControl(airlineId),
      'ticketId': new FormControl(0),
      'destination': new FormGroup({
        'startDestination': new FormControl(null, Validators.required),
        'endDestination': new FormControl(null, Validators.required)
      }, this.compareDestinations),
      'startDateAndTime': new FormControl(null, [Validators.required, this.checkDate]),
      'ticketPrice': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'discount': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
    });

    switch (this.route.snapshot['_routerState'].url.split('/')[5]) {
      case 'edit':
        this.route.params.subscribe((params: Params) => {
          this.header = "Edit ticket";
          let ticketId = +params['id'];

          this.ticketService.getTicket(ticketId).subscribe(
            (res: QuickReservationTicket) => {
              this.addTicket.setValue({
                'airlineId': airlineId,
                'ticketId': res.Id,
                'destination': {
                  'startDestination': res.StartDestination,
                  'endDestination': res.EndDestination
                },
                'startDateAndTime': res.StartDateAndTime,
                'ticketPrice': res.TicketPrice,
                'discount': res.Discount
              });
            },
            err => {
              console.log(err);
            }
          );
        });
        break;
    }
  }

  checkDate(control: FormControl): { [error: string]: boolean } {
    let currentDate = new Date();

    if(control.value !== null){
      let date = new Date(control.value);

      if(date < currentDate){
        return { 'currentDate': true }; 
      }
      else{
        return null;
      }
    }

    return null;
  }
    
  compareDestinations(formGroup: FormGroup): { [error: string]: boolean } | null {
    if (formGroup.get('startDestination').value !== null && formGroup.get('endDestination').value !== null) {
      if (formGroup.get('startDestination').value === formGroup.get('endDestination').value) {
        return { 'sameDestination': true };
      }
      else
        return null;
    }

    return null;
  }

  onSubmit() {
    let takeOffDT = this.addTicket.get('startDateAndTime').value;
    let takeOffDate = takeOffDT.split('T')[0];
    let takeOffTime = takeOffDT.split('T')[1];

    let takeOffDateTime = new Date(+takeOffDate.split('-')[0],
      +takeOffDate.split('-')[1] - 1,
      +takeOffDate.split('-')[2],
      +takeOffTime.split(':')[0],
      +takeOffTime.split(':')[1]
    );

    let ticket = new QuickReservationTicket(
      this.addTicket.get('ticketId').value,
      this.addTicket.get('destination').get('startDestination').value,
      this.addTicket.get('destination').get('endDestination').value,
      takeOffDateTime,
      this.addTicket.get('ticketPrice').value,
      this.addTicket.get('discount').value
    )

    if (this.addTicket.get('ticketId').value === 0) {
      this.ticketService.addTicket(this.addTicket.get('airlineId').value, ticket).subscribe(
        res => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      this.ticketService.updateTicket(ticket).subscribe(
        res => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
