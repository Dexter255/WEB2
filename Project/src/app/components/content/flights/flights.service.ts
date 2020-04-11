export class FlightsService{
    private flights: string[];

    constructor() {
        this.flights = [];

        this.flights.push("MIHAJLO", "ROHALJ", "MATIJA", "TRESKA");
    }

    getFlights(){
        return this.flights.slice();
    }

    getFlight(index: number){
        return this.flights[index];
    }
}