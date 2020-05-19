import { Flight } from '../models/flight/flight.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AirlineService{
    private airlines: {companyName: string, description: string}[];

    constructor() {
        this.airlines = [];

        this.airlines.push({companyName: "AvioKompanija1", description: "Opis AvioKompanije1"});
        this.airlines.push({companyName: "AvioKompanija2", description: "Opis AvioKompanije2"});
        this.airlines.push({companyName: "AvioKompanija3", description: "Opis AvioKompanije3"});
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

    addAirline(airline: {companyName: string, description: string}){
        this.airlines.push(airline);
    }

    updateAirline(index: number, airline: {companyName: string, description: string}){
        this.airlines[index] = airline;
    }
}