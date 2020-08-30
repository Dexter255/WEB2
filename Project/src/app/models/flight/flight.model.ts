import { Time } from '@angular/common';
import { Destination } from './destination.model';
import { Row } from './row.model';

export class Flight {
    public Id: number;
    public StartDestination: string;
    public EndDestination: string;
    public StartDateAndTime: Date;
    public EndDateAndTime: Date;
    public Hours: string;
    public Distance: number;
    public Locations: Destination[];
    public TicketPrice: number;
    public QuickREservationTicketCount: number;
    public Discount: number;
    // mesta u avionu
    public Rows: Row[];
    public Rating: number;

    constructor(id: number, startDestination: string, endDestination: string, startDateAndTime: Date, endDateAndTime: Date, hours: string, distance: number,
        locations: Destination[], ticketPrice: number, discount: number) {
        this.Id = id;
        this.StartDestination = startDestination;
        this.EndDestination = endDestination;
        this.StartDateAndTime = startDateAndTime;
        this.EndDateAndTime = endDateAndTime;
        this.Hours = hours;
        this.Distance = distance;
        this.Locations = locations;
        this.TicketPrice = ticketPrice;
        this.Discount = discount;
        this.Rows = [];
        this.Rating = 0;
    }
}