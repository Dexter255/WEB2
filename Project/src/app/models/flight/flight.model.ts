import { FlightLocation } from './flight-location.model';
import { Time } from '@angular/common';

export class Flight
{
    public  ID:number;
    public  StartFlightDateAndTime: Date;
    public  EndFlightDateAndTime: Date;
    public  FlightHours: Time;
    public  FlightDistance: number;
    public  FlightLocations: FlightLocation[];
    public  FlightTicketPrice: number;

    constructor(ID:number, startFlightDateAndTime:Date, endFlightDateAndTime:Date, flightHours:Time, flightDistance:number,
                 flightLocations:FlightLocation[], flightTicketPrice:number) {
        this.ID=ID;
        this.StartFlightDateAndTime = startFlightDateAndTime;
        this.EndFlightDateAndTime = endFlightDateAndTime;
        this.FlightHours = flightHours;
        this.FlightDistance = flightDistance;
        this.FlightLocations = flightLocations;
        this.FlightTicketPrice = flightTicketPrice;
    }
}