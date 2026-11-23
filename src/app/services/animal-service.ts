import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animals } from '../classes/Animals';


@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  constructor(public http: HttpClient) { }

  GetAllAnimals(): Observable<Array<Animals>> {
    return this.http.get<Array<Animals>>(`https://localhost:7293/api/Animals/GetAllAnimals`);
  }
}