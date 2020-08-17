import { Time } from '@angular/common';

export class QuickReservationTicket {
    public Id: number;
    public StartDestination: string;
    public EndDestination: string;
    public StartDateAndTime: Date;
    public EndDateAndTime: Date;
    public Hours: Time;
    public Distance: number;
    public TicketPrice: number;
    // mesto u avionu koje je rezervisano    ???
    public Discount: number;

    constructor(ID: number, startDestination: string, endDestination: string, startDateAndTime: Date, endDateAndTime: Date, hours: Time, distance: number,
        locations: Location[], ticketPrice: number, discount: number) {
        this.Id = ID;
        this.StartDestination = startDestination;
        this.EndDestination = endDestination;
        this.StartDateAndTime = startDateAndTime;
        this.EndDateAndTime = endDateAndTime;
        this.Hours = hours;
        this.Distance = distance;
        this.TicketPrice = ticketPrice;
        this.Discount = discount;
    }
}