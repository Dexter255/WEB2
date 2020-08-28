import { Passenger } from './passenger.model';
import { Flight } from './flight.model';

export class ReservedFlight{
    public Id: number;
    public FlightId: number;
    public Destination: string;
    public Passengers: Passenger[];
}