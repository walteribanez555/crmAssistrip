import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private readonly http: HttpClient) {}

  // private apiUrl = '/api/reembolsos';
  private apiUrl = environment.apiNotificationsService + '/images';

  postNotification(image : FormData) :Observable<string>  {
    return this.http.post(this.apiUrl, image)
      .pipe(
        map( (data : any )=> data.imgUrl),
        catchError((data) => {
          console.log(data);
          throw new Error(data);
        })
      );
  }
}
