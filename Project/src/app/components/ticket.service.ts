import { Injectable } from '@angular/core';
import { Flight } from '../models/flight/flight.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TicketService{
    public tickets: Flight[];

    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient){
        this.tickets = [];
    }
    getTickets(airlineId: number){
        return this.http.get(this.BaseURI + '/Ticket/GetTickets/' + airlineId)
        .pipe(
            tap((res: Flight[]) => this.tickets = res)
        );
    }
}