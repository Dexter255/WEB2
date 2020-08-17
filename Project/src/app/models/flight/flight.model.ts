import { Time } from '@angular/common';
import { Destination } from './destination.model';

export class Flight {
    public Id: number;
    public StartDestination: string;
    public EndDestination: string;
    public StartDateAndTime: Date;
    public EndDateAndTime: Date;
    public Hours: Time;
    public Distance: number;
    public Locations: Destination[];
    public TicketPrice: number;
    // mesta u avionu?
    public Rating: number;

    constructor(id: number, startDestination: string, endDestination: string, startDateAndTime: Date, endDateAndTime: Date, hours: Time, distance: number,
        locations: Destination[], ticketPrice: number, rating: number) {
        this.Id = id;
        this.StartDestination = startDestination;
        this.EndDestination = endDestination;
        this.StartDateAndTime = startDateAndTime;
        this.EndDateAndTime = endDateAndTime;
        this.Hours = hours;
        this.Distance = distance;
        this.Locations = locations;
        this.TicketPrice = ticketPrice;
        this.Rating = rating;
    }
}