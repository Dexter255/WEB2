import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight } from '../models/flight/flight.model';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FlightService {
    public flights: Flight[];
    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient) {
        this.flights = [];
    }

    checkFlightId(companyId: number, vehicleId: number) {
        // if(this.vehicles.find(x => x.Id === companyId).Vehicles.find(x => x.id === vehicleId) === undefined)
        //     return false

        return true;
    }

    getFlights(airlineId: number) {
        return this.http.get(this.BaseURI + '/Flight/GetFlights/' + airlineId)
            .pipe(
                tap(res => this.flights = res as Flight[])
            );
    }

    getFlight(flightId: number) {
        return this.http.get(this.BaseURI + '/Flight/' + flightId);
    }

    updateFlight(flight: Flight) {
        return this.http.put(this.BaseURI + '/Flight/' + flight.Id, flight);
    }

    deleteFlight(flightId: number) {
        return this.http.delete(this.BaseURI + '/Flight/' + flightId);
    }
}