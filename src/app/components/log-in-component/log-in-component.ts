import { Component } from '@angular/core';
import { VisitorsService } from '../../services/visitors-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-component',
  standalone: false,
  templateUrl: './log-in-component.html',
  styleUrl: './log-in-component.css',
})
export class LogInComponent {
  constructor(public s: VisitorsService, public r: Router) { }

  login() {
    this.s.GetVisitorsByIdAndMail(this.s.v.idVisitors!, this.s.v.emailVisitors!).subscribe(
      data  => {
        this.s.v = data;
        this.s.flag = false;
        this.r.navigate(['./personalArea']);
      },
      error => {
        this.r.navigate(['./orderCards']);
      }
  )}
}