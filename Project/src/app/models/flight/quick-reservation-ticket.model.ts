import { Time } from '@angular/common';

export class QuickReservationTicket {
    public Id: number;
    public StartDestination: string;
    public EndDestination: string;
    public StartDateAndTime: Date;
    public TicketPrice: number;
    // mesto u avionu koje je rezervisano    ???
    public Discount: number;

    constructor(id: number, startDestination: string, endDestination: string, startDateAndTime: Date, ticketPrice: number, discount: number) {
        this.Id = id;
        this.StartDestination = startDestination;
        this.EndDestination = endDestination;
        this.StartDateAndTime = startDateAndTime;
        this.TicketPrice = ticketPrice;
        this.Discount = discount;
    }
}