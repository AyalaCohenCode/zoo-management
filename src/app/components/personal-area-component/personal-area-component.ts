import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from '../../services/tickets-service';
import { VisitorsService } from '../../services/visitors-service';
import { Tickets } from '../../classes/Tickets';

@Component({
  selector: 'app-personal-area-component',
  standalone: false,
  templateUrl: './personal-area-component.html',
  styleUrl: './personal-area-component.css',
})
export class PersonalAreaComponent {

  constructor(public r: Router, public vs: VisitorsService, public ts: TicketsService) { }

  selectedTicket: Tickets | null = null;
  showDetails: boolean = false;
  updatedTicket: Tickets = new Tickets();
  flag: boolean = false;

  // ---------------- DELETE ----------------
  deleteTicket(index: number) {
    const ticket = this.ts.tickets[index];
    this.ts.DeleteTicketsToVisitors(ticket.codeTickets!).subscribe(() => {
      this.ts.tickets.splice(index, 1);
      alert("ההזמנה נמחקה");
    });
  }

  selectTicket(ticket: Tickets) {
    this.selectedTicket = ticket;
  }

  // ---------------- DATE CHECK ----------------
  isFutureDate(date: any): boolean {
    return new Date(date) > new Date();
  }

  // ---------------- EDIT ----------------
  editTicket(ticket: Tickets) {
    this.updatedTicket = { ...ticket };
    this.flag = true;
  }

  // ---------------- SAVE UPDATE ----------------
  saveUpdate() {

    const adults = Number(this.updatedTicket.numAdult) || 0;
    const children = Number(this.updatedTicket.numChild) || 0;

    if (adults + children === 0) {
      alert("יש להזמין לפחות כרטיס אחד");
      return;
    }

    this.updatedTicket.priceTickets = (adults * 70) + (children * 50);

    this.ts.UpdateTickets(this.updatedTicket.codeTickets!, this.updatedTicket).subscribe(
      data => {
        const index = this.ts.tickets.findIndex(
          t => t.codeTickets === this.updatedTicket.codeTickets
        );
        if (index !== -1) {
          this.ts.tickets[index] = data;
        }
        this.flag = false;
        alert("ההזמנה עודכנה בהצלחה");
      });
  }

  // ---------------- INIT ----------------
  ngOnInit() {

    this.vs.GetVisitorsById(this.vs.v.idVisitors!)
      .subscribe(data => {
        this.vs.v = data;
      });

    this.ts.GetTicketsByIdVisitors(this.vs.v.idVisitors!)
      .subscribe(data => {
        this.ts.tickets = data;
      });
  }
}