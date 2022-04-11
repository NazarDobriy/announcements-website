import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAnnouncement } from './models/announcement.interface';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
   private url: string = environment.backendLink;

  constructor(private http: HttpClient) {}

  public getAllAnnouncements(): Observable<IAnnouncement[]> {
    return this.http.get<IAnnouncement[]>(this.url + 'all-announcements');
  }
}
