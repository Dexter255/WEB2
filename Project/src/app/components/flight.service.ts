import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight } from '../models/flight/flight.model';
import { tap } from 'rxjs/operators';
import { ReservedFlight } from '../models/flight/reserved-flight.model';
import { Passenger } from '../models/flight/passenger.model';
import { FlightInvitation } from '../models/flight/flight-invitation.model';

@Injectable({
    providedIn: 'root'
})
export class FlightService {
    private readonly BaseURI = 'https://localhost:44305/api';
    public flights: Flight[];
    public flight: Flight;
    public reservedFlights: ReservedFlight[];
    public reservedFlight: ReservedFlight;
    public flightInvitations: FlightInvitation[];
    public invitationFromUser: string;
    public areTickets: boolean;

    constructor(private http: HttpClient) {
        this.flights = [];
        this.reservedFlights = [];
        this.flightInvitations = [];
        this.areTickets = false;
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

    addFlight(airlineId: number, xSeats: number, ySeats: number, flight: Flight) {
        return this.http.post(this.BaseURI + '/Flight/AddFlight/' + airlineId + '/' + xSeats + '/' + ySeats, flight);
    }

    addSeatsForQuickReservationTickets(flightId: number, passengers: Passenger[]){
        return this.http.post(this.BaseURI + '/Flight/AddSeatsForQuickReservationTickets/' + flightId, passengers);
    }
    
    searchFlights(airlineId: number, body: any){
        return this.http.post(this.BaseURI + '/Flight/SearchFlights/' + airlineId, body)
        .pipe(
            tap((res: Flight[]) => this.flights = res)
        );
    }

    reserveFlight(flightId: number, passengers: Passenger[]){
        return this.http.post(this.BaseURI + '/Flight/ReserveFlight/' + flightId, passengers);
    }

    getReservedFlights(){
        return this.http.get(this.BaseURI + '/Flight/GetReservedFlights')
            .pipe(
                tap((res: ReservedFlight[]) => this.reservedFlights = res)
            );
    }

    getReservedFlight(flightId: number){
        return this.http.get(this.BaseURI + '/Flight/GetReservedFlight/' + flightId)
            .pipe(
                tap((res: ReservedFlight) => this.reservedFlight = res)
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

    rateFlight(flightId: number, companyRating: number, rating: number){
        return this.http.get(this.BaseURI + '/Flight/RateReservedFlight/' + flightId + '/' + companyRating + '/' + rating);
    }
}