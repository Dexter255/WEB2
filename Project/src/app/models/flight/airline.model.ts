import { Flight } from './flight.model';
import { Destination } from './destination.model';
import { Luggage } from './luggage.model';

export class Airline {
    public Id: number;
    public CompanyName: string;
    public Address: string;
    public Description: string;
    public Destinations: Destination[];
    public Flights: Flight[];
    public LuggageInfo: Luggage[];
    public Rating: number;
    public RatedCount: number;

    constructor(id: number, companyName: string, address: string, description: string, destinations: Destination[],
        luggageInfo: Luggage[], flights: Flight[], rating: number, ratedCount: number) {
        this.Id = id;
        this.CompanyName = companyName;
        this.Address = address;
        this.Description = description;
        this.Destinations = destinations;
        this.Flights = flights;
        this.LuggageInfo = luggageInfo;
        this.Rating = rating;
        this.RatedCount = ratedCount;
    }
}