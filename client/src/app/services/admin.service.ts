import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../domain/result.entity';
import { Observable } from 'rxjs';
import { environment } from 'client/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getPersoneroResults(): Observable<Result[]>{
    return this.http.get<Result[]>(`${environment.API}/admin/personero`)
  }

  getRepresentativeResults(): Observable<Result[]>{
    return this.http.get<Result[]>(`${environment.API}/admin/representative`)
  }
}
