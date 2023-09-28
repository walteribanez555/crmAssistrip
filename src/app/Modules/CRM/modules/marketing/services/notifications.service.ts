import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private readonly http: HttpClient) {}

  // private apiUrl = '/api/reembolsos';
  private apiUrl = environment.apiNotificationsService + '/notifications';

  postNotification(title: string, content: string, fileUrl : string | null = null) {
    return this.http
      .post(this.apiUrl, {
        title,
        content,
        fileUrl
      })
      .pipe(
        catchError((data) => {
          console.log(data);
          throw new Error(data);
        })
      );
  }
}
