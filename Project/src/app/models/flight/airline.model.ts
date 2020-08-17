import { Flight } from './flight.model';
import { Destination } from './destination.model';
import { QuickReservationTicket } from './quick-reservation-ticket.model';
import { Luggage } from './luggage.model';

export class Airline {
    public Id: number;
    public CompanyName: string;
    public Address: string;
    public Description: string;
    public Destinations: Destination[];
    public Flights: Flight[];
    public QuickReservationTickets: QuickReservationTicket[];
    public LuggageInfo: Luggage[];
    public Rating: number;

    constructor(id: number, companyName: string, address: string, description: string, destinations: Destination[],
        flights: Flight[], quickReservationTickets: QuickReservationTicket[], luggageInfo: Luggage[], rating: number) {
        this.Id = id;
        this.CompanyName = companyName;
        this.Address = address;
        this.Description = description;
        this.Destinations = destinations;
        this.Flights = flights;
        this.QuickReservationTickets = quickReservationTickets;
        this.LuggageInfo = luggageInfo;
        this.Rating = rating;
    }
}