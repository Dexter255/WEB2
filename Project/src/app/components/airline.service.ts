import { Flight } from '../models/flight/flight.model';
import { Injectable } from '@angular/core';
import { Airline } from '../models/flight/airline.model';

@Injectable({
    providedIn: 'root'
})
export class AirlineService{
    airlines: Airline[];

    constructor() {
        this.airlines = [];

        this.airlines.push(new Airline(5, "aaarte", "sadsad", "dsadsa", [],
                                       [], [], []));
    }

    addFlight(companyID:number , flight: Flight)
    {
        this.airlines[companyID].Flights.push(flight);
    }

    checkAirlineId(index: number){
        if(this.airlines.length > index)
            return true;

        return false;
    }
    
    getAirlines(){
        return this.airlines;
    }

    getAirline(index: number){
        return this.airlines[index];
    }

    deleteAirline(index: number){
        this.airlines.splice(index, 1);
    }

    addAirline(airline: Airline){
        this.airlines.push(airline);
    }

    updateAirline(airline: Airline){
        //this.airlines[index] = airline;
    }

    getFlights(companyID: number)
    {
        return this.airlines[companyID].Flights;
    }
}