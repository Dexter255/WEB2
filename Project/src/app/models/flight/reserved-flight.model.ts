import { Passenger } from './passenger.model';

export class ReservedFlight{
    public Id: number;
    public FlightId: number;
    public Destination: string;
    public Passengers: Passenger[];
    public Landed: boolean;
    public Rated: boolean;
    public Rating: number;
}