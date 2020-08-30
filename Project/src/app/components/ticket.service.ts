import { Injectable } from '@angular/core';
import { Flight } from '../models/flight/flight.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private readonly BaseURI = 'https://localhost:44305/api';
    public tickets: Flight[];

    constructor(private http: HttpClient) {
        this.tickets = [];
    }

    getTickets(airlineId: number) {
        return this.http.get(this.BaseURI + '/Ticket/GetTickets/' + airlineId)
            .pipe(
                tap((res: Flight[]) => this.tickets = res)
            );
    }

    searchTickets(airlineId: number, body: any) {
        return this.http.post(this.BaseURI + '/Ticket/SearchTickets/' + airlineId, body)
            .pipe(
                tap((res: Flight[]) => this.tickets = res)
            );
    }
}