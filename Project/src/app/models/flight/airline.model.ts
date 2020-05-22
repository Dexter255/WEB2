import { Flight } from './flight.model';
import { Destination } from './destination.model';
import { Luggage } from './luggage.model';

export class Airline {
    public ID: number;
    public Name: string;
    public Address: string;
    public Description: string;
    public Destinations: Destination[];
    public Flights: Flight[];
    public QuickReservationTickets: string[];
    public LuggageInfo: Luggage[];

    constructor(ID: number, Name: string, Address: string, Description: string, Destinations: Destination[],
        Flights: Flight[], QuickReservationTickets: string[], LuggageInfo: Luggage[]) {
        this.ID = ID;
        this.Name = Name;
        this.Address = Address;
        this.Description = Description;
        this.Destinations = Destinations;
        this.Flights = Flights;
        this.QuickReservationTickets = QuickReservationTickets;
        this.LuggageInfo = LuggageInfo;
    }
}