import { Flight } from 'src/app/models/flight/flight.model';

export class FlightsService{
    private flights: Flight[];

    constructor() {
        this.flights = [];
        
        this.flights.push(new Flight("25.03.2020", "27.03.2020", 5, 2000, 2, "Budapest, Miami", 1000));
        this.flights.push(new Flight("22.04.2020", "23.04.2020", 4, 1500, 1, "Beograd, New York", 1500));
        this.flights.push(new Flight("11.05.2020", "12.05.2020", 3, 1000, 1, "Zagreb, Amsterdam", 7500));
    }

    getFlights(){
        return this.flights.slice();
    }

    getFlight(index: number){
        return this.flights[index];
    }
}