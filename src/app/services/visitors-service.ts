import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visitors } from '../classes/Visitors';

@Injectable({
  providedIn: 'root',
})
export class VisitorsService {
  constructor(public http: HttpClient) { }
  v:Visitors=new Visitors()
  flag:boolean=true
  baseUrl: string = 'https://localhost:7293/api/Visitors/';
  
  GetVisitorsById(idVisitors: String):Observable<Visitors>{
    return this.http.get<Visitors>(`${this.baseUrl}GetVisitorsById/${idVisitors}`);
  }

  GetVisitorsByIdAndMail(idVisitors: String, emailVisitors:String):Observable<Visitors>{
    return this.http.get<Visitors>(`${this.baseUrl}GetVisitorsByIdAndMail/${idVisitors}/${emailVisitors}`);
  }

  AddVisitors(visitors: Visitors):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}AddVisitors`, visitors);
  }
}