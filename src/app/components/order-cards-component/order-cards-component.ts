import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VisitorsService } from '../../services/visitors-service';
import { Visitors } from '../../classes/Visitors';
import { Router } from '@angular/router';
import { Tickets } from '../../classes/Tickets';
import { TicketsService } from '../../services/tickets-service';

@Component({
  selector: 'app-order-cards-component',
  standalone: false,
  templateUrl: './order-cards-component.html',
  styleUrl: './order-cards-component.css',
})
export class OrderCardsComponent {
  constructor(public s: VisitorsService, public r: Router, public t: TicketsService) { }
  v: Visitors = new Visitors()
  ticket: Tickets = new Tickets()
  visitor!: FormGroup;
  childTicket: number = 50;
  adultTicket: number = 70;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.visitor = new FormGroup({
      idVisitors: new FormControl(this.s.v.idVisitors, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(9)]),
      nameVisitors: new FormControl(this.s.v.nameVisitors, [Validators.required, Validators.pattern("^[א-תa-zA-Z ]*$")]),
      emailVisitors: new FormControl(this.s.v.emailVisitors, [Validators.required, Validators.email]),
      dateVisitor: new FormControl(null, [Validators.required]),
      cards18Plus: new FormControl(null, [Validators.min(0)]),
      cardsUnder18: new FormControl(null, [Validators.min(0)])
    });
  }

  isDateCorrect(date: any): boolean {
    return new Date(date) > new Date();
  }

  get idVisitors() {
    return this.visitor.controls['idVisitors'];
  }

  get nameVisitors() {
    return this.visitor.controls['nameVisitors'];
  }

  get emailVisitors() {
    return this.visitor.controls['emailVisitors'];
  }

  get dateVisitor() {
    return this.visitor.controls['dateVisitor'];
  }

  get cards18Plus() {
    return this.visitor.controls['cards18Plus'];
  }

  get cardsUnder18() {
    return this.visitor.controls['cardsUnder18'];
  }

  createTicket() {

    const adults = Number(this.cards18Plus.value) || 0;
    const children = Number(this.cardsUnder18.value) || 0;

    if (adults + children === 0) {
      alert("יש להזמין לפחות כרטיס אחד");
      return;
    }

    this.totalPrice = (adults * this.adultTicket) + (children * this.childTicket);

    alert("הסכום שעליך לשלם הינו בסך: " + this.totalPrice + " ש\"ח");

    this.ticket = new Tickets(
      this.t.generateCode(),
      this.idVisitors.value,
      this.dateVisitor.value,
      adults,
      children,
      this.totalPrice
    );

    this.t.AddTickets(this.ticket).subscribe(
      data => {
        this.ticket = data;
        alert("הכרטיסים הוזמנו בהצלחה");
        this.r.navigate(['./personalArea']);
      },
      error => {
        alert('Error adding ticket');
      }
    );
  }

  submitOrder() {

    this.s.GetVisitorsByIdAndMail(
      this.idVisitors.value,
      this.emailVisitors.value
    ).subscribe(
      data => {

        //  משתמש קיים
        this.s.v = data;
        this.s.flag = false;

        this.createTicket();

      },
      error => {

        //  משתמש חדש
        this.v = new Visitors(
          this.idVisitors.value,
          this.nameVisitors.value,
          this.emailVisitors.value
        );

        this.s.AddVisitors(this.v!).subscribe(data => {
          this.s.v = this.v;
          this.s.flag = false;

          this.createTicket();
        });
      }
    );
  }
}