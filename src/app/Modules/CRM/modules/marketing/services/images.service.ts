import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  userid: any;
  bucketName : string = "assistrip-external-repo";

  constructor(
    private http: HttpClient) { }
  files  = [];



  bucket = new S3(
    {
        accessKeyId: 'AKIASS7IJCZIUV4RS5GE',
        secretAccessKey: 'Xq2k9UMkarc0/c/gnJay+o5E3KDb03RkBLCZtZpl',
    }
   );



   subirArchivo(file: File): Promise<any> {
    const fechaHoraActual = new Date().toISOString().replace(/[:.]/g, '-');
    const key = `images/${fechaHoraActual}_${file.name}`;
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      expires : 3600000
    };

    return this.bucket.upload(params).promise();
  }

  downloadFile( key : string ) {
    const params = {
      Bucket: this.bucketName,
      Key: key
    };
    this.bucket.getObject(params, function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    });
  }


  private apiUrl = environment.bucketS3 ;

  postNotification(image: File): Observable<string> {


    var params = {
      Bucket :"assistrip-external-repo",
      Key : "prueba",
      Expires : 3600,
      ContentType : image.type
    }


    return this.http.put("https://assistrip-external-repo.s3.amazonaws.com/images/1", image)
      .pipe(
        map((data: any) => data.imgUrl),
        catchError((error) => {
          console.error(error);
          throw new Error(error);
        })
      );
  }



}
