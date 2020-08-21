import { Injectable } from '@angular/core';
import { QuickReservationTicket } from '../models/flight/quick-reservation-ticket.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    public tickets: QuickReservationTicket[];
    public ticket: QuickReservationTicket;
    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient) {
        this.tickets = [];
    }

    getTickets(airlineId: number) {
        return this.http.get(this.BaseURI + '/Ticket/GetTickets/' + airlineId)
            .pipe(
                tap((res: QuickReservationTicket[]) => this.tickets = res)
            );
    }

    getTicket(ticketId: number) {
        return this.http.get(this.BaseURI + '/Ticket/GetTicket/' + ticketId)
            .pipe(
                tap((res: QuickReservationTicket) => this.ticket = res)
            );
    }
    
    addTicket(airlineId: number, ticket: QuickReservationTicket) {
        return this.http.post(this.BaseURI + '/Ticket/' + airlineId, ticket);
    }

    updateTicket(ticket: QuickReservationTicket) {
        return this.http.put(this.BaseURI + '/Ticket/' + ticket.Id, ticket);
    }

    deleteTicket(ticketId: number) {
        return this.http.delete(this.BaseURI + '/Ticket/' + ticketId);
    }
}