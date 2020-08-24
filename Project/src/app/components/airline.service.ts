import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators'

import { Airline } from '../models/flight/airline.model';

@Injectable({
    providedIn: 'root'
})
export class AirlineService {
    public airlines: Airline[];
    public airline: Airline;
    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient) {
        this.airlines = [];
    }

    checkAirlineId(index: number) {
        if (this.airlines.length > index)
            return true;

        return false;
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