import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tickets } from '../classes/Tickets';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor(public http: HttpClient) { }
  tickets: Array<Tickets> = new Array<Tickets>();
  private nextCode: number = 1;

  generateCode(): number {
    return this.nextCode++;
  }
  
  baseURL: string = 'https://localhost:7293/api/Tickets/';

  GetTicketsByIdVisitors(idVisitors: string): Observable<Array<Tickets>> {
    return this.http.get<Array<Tickets>>(`${this.baseURL}GetTicketsByIdVisitors/${idVisitors}`);
  }

  AddTickets(tickets: Tickets): Observable<Tickets> {
    return this.http.post<Tickets>(`${this.baseURL}AddTickets`, tickets);
  }

  UpdateTickets(codeTickets: number, tickets: Tickets): Observable<Tickets> {
    return this.http.put<Tickets>(`${this.baseURL}UpdateTickets/${codeTickets}`, tickets);
  }

  DeleteTicketsToVisitors(codeTickets: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseURL}DeleteTickets/${codeTickets}`);
  }
}