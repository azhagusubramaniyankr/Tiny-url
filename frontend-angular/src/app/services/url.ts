import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Url {
  id?: number;
  originalUrl: string;
  shortCode?: string;
  isPrivate: boolean;
  clicks?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = 'http://localhost:5000/api/urls';

  constructor(private http: HttpClient) {}

  createUrl(url: Url): Observable<Url> {
    return this.http.post<Url>(this.apiUrl, url);
  }

  getUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(this.apiUrl);
  }

  deleteUrl(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
