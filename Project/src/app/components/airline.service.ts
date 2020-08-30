import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators'

import { Airline } from '../models/flight/airline.model';
import { Flight } from '../models/flight/flight.model';

@Injectable({
    providedIn: 'root'
})
export class AirlineService {
    private readonly BaseURI = 'https://localhost:44305/api';
    public airlines: Airline[];
    public airline: Airline;

    constructor(private http: HttpClient) {
        this.airlines = [];
    }

    getAirlines() {
        return this.http.get(this.BaseURI + '/Airline')
            .pipe(
                tap((res: Airline[]) => this.airlines = res)
            );;
    }

    getAirline(airlineId: number) {
        return this.http.get(this.BaseURI + '/Airline/GetAirline/' + airlineId)
            .pipe(
                tap((res: Airline) => this.airline = res)
            );
    }

    deleteAirline(airlineId: number) {
        return this.http.delete(this.BaseURI + '/Airline/' + airlineId);
    }

    addAirline(airline: Airline) {
        return this.http.post(this.BaseURI + '/Airline', airline);
    }

    updateAirline(airline: Airline) {
        return this.http.put(this.BaseURI + '/Airline/' + airline.Id, airline);
    }

    getDestinations(airlineId: number) {
        return this.http.get(this.BaseURI + '/Airline/GetDestinations/' + airlineId);
    }

    searchAirlines(body: any) {
        return this.http.post(this.BaseURI + '/Airline/SearchAirlines', body)
            .pipe(
                tap((res: Airline[]) => this.airlines = res)
            );
    }
}