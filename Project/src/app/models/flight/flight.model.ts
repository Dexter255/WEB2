export class Flight
{
    public  startFlightDateAndTime: string;
    public  endFlightDateAndTime: string;
    public  flightHours: number;
    public  flightDistance: number;
    public  numberOfLocations: number;
    public  flightLocations: string;
    public  flightTicketPrice: number;

    constructor(startFlightDateAndTime:string, endFlightDateAndTime:string, flightHours:number, flightDistance:number,
        numberOfLocations:number, flightLocations:string, flightTicketPrice:number) {
        this.startFlightDateAndTime = startFlightDateAndTime;
        this.endFlightDateAndTime = endFlightDateAndTime;
        this.flightHours = flightHours;
        this.flightDistance = flightDistance;
        this.numberOfLocations = numberOfLocations;
        this.flightLocations = flightLocations;
        this.flightTicketPrice = flightTicketPrice;
    }
}