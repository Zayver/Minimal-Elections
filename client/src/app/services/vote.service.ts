import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Vote } from '../domain/vote.entity';
import { Observable } from 'rxjs';
import { Portrait } from '../domain/portrait.entity';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) {}

  getPersoneros(): Observable<Portrait[]>{
    return this.http.get<Portrait[]>(`${environment.API}/vote/personeros`)
  }

  getRepresentatives(): Observable<Portrait[]>{
    return this.http.get<Portrait[]>(`${environment.API}/vote/representatives`)
  }


  sendVote(vote: Vote): Observable<never>{
    return this.http.post<never>(`${environment.API}/vote`, vote)
  }
}
