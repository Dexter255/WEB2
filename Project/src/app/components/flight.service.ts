import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight } from '../models/flight/flight.model';
import { tap } from 'rxjs/operators';
import { SeatModel } from '../models/flight/seat-model.model';
import { ReservedFlight } from '../models/flight/reserved-flight.model';
import { Passenger } from '../models/flight/passenger.model';
import { FlightInvitation } from '../models/flight/flight-invitation.model';

@Injectable({
    providedIn: 'root'
})
export class FlightService {
    public flights: Flight[];
    public flight: Flight;
    public reservedFlights: ReservedFlight[];
    public passengers: Passenger[];
    public flightInvitations: FlightInvitation[];
    public invitationFromUser: string;
    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient) {
        this.flights = [];
        this.reservedFlights = [];
        this.passengers = [];
        this.flightInvitations = [];
    }

    checkFlightId(companyId: number, vehicleId: number) {
        // if(this.vehicles.find(x => x.Id === companyId).Vehicles.find(x => x.id === vehicleId) === undefined)
        //     return false

        return true;
    }

    getFlights(airlineId: number) {
        return this.http.get(this.BaseURI + '/Flight/GetFlights/' + airlineId)
            .pipe(
                tap((res: Flight[]) => this.flights = res)
            );
    }

    getFlight(flightId: number) {
        return this.http.get(this.BaseURI + '/Flight/GetFlight/' + flightId)
            .pipe(
                tap((res: Flight) => this.flight = res)
            );
    }

    updateFlight(flight: Flight) {
        return this.http.put(this.BaseURI + '/Flight/' + flight.Id, flight);
    }

    deleteFlight(flightId: number) {
        return this.http.delete(this.BaseURI + '/Flight/' + flightId);
    }

    addFlight(airlineId: number, flight: Flight) {
        return this.http.post(this.BaseURI + '/Flight/AddFlight/' + airlineId, flight);
    }

    addSeatsForQuickReservationTickets(flightId: number, seats: SeatModel[]){
        return this.http.post(this.BaseURI + '/Flight/AddSeatsForQuickReservationTickets/' + flightId, seats);
    }
    
    searchFlights(airlineId: number, body: any){
        return this.http.post(this.BaseURI + '/Flight/SearchFlights/' + airlineId, body)
        .pipe(
            tap((res: Flight[]) => this.flights = res)
        );
    }

    reserveFlight(flightId: number, body: SeatModel[]){
        return this.http.post(this.BaseURI + '/Flight/ReserveFlight/' + flightId, body);
    }

    getReservedFlight(){
        return this.http.get(this.BaseURI + '/Flight/GetReservedFlights')
            .pipe(
                tap((res: ReservedFlight[]) => this.reservedFlights = res)
            );
    }

    cancelReservation(flightId: number){
        return this.http.get(this.BaseURI + '/Flight/CancelReservation/' + flightId);
    }

    getFlightInvitations(){
        return this.http.get(this.BaseURI + '/Flight/GetFlightInvitations')
            .pipe(
                tap((res: FlightInvitation[]) => this.flightInvitations = res)
            );
    }

    acceptFlightInvitation(flightId: number){
        return this.http.get(this.BaseURI + '/Flight/AcceptFlightInvitation/' + flightId);
    }

    declineFlightInvitation(flightId: number){
        return this.http.get(this.BaseURI + '/Flight/DeclineFlightInvitation/' + flightId);
    }
}