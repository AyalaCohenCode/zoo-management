import { Component, signal } from '@angular/core';
import { VisitorsService } from './services/visitors-service';
import { Visitors } from './classes/Visitors';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my_project');
  
  constructor(public s:VisitorsService){}
  logIn(){
    this.s.flag=false;
  }
  
  logOut(){
    this.s.flag=true;
    this.s.v = new Visitors();
  }
}
