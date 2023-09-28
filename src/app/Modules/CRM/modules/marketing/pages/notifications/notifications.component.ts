import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { image } from 'd3';
import { ImagesService } from '../../services/images.service';
import {switchMap} from 'rxjs';

@Component({
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  private notificationService = inject(NotificationsService);
  private sanitizer = inject(DomSanitizer);
  private imageService = inject(ImagesService);

  isLoading: boolean = false;
  public files: any[] = [];
  public preview: string | null = null;

  public notificationForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
    image: new FormControl(null, []),
  });

  submitForm() {
    try {
      this.isLoading = true;

      let imageUrl: string | null = null;

      const { title, body } = this.notificationForm.value;

      if (this.files.length > 0) {
        console.log("Hay archivos")
        const imagesForm = new FormData();
        this.files.forEach((file) => {
          imagesForm.append('image', file);
        });

        this.imageService.postNotification(imagesForm).pipe(
          switchMap( imgUrl => {

            imageUrl = imgUrl;

            return this.notificationService.postNotification(title, body, imageUrl)


          })
        ).subscribe({
          error: () => {
            this.showError('No se puede realizar');
          },
          complete: () => {
            this.notificationForm.get('image')!.setValue(null);
            this.notificationForm.get('title')!.setValue(null);
            this.notificationForm.get('body')!.setValue(null);
            this.files = [];
            this.preview = null;
            this.showSuccess();
            this.isLoading = false;
            imageUrl = null;
          },
        });
      }

      else {
        this.notificationService.postNotification(title, body, imageUrl).subscribe({
          error: () => {
            this.showError('No se puede realizar');
          },
          complete: () => {
            this.notificationForm.get('image')!.setValue(null);
            this.notificationForm.get('title')!.setValue(null);
            this.notificationForm.get('body')!.setValue(null);
            this.files = [];
            this.preview = null;
            this.showSuccess();
            this.isLoading = false;
            imageUrl = null;
          },
        });

      }



    } catch {}
  }

  showSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Notificacion Agregada a Todo el Mundo',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  showError(error: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'No se pudo realizar',
      showConfirmButton: false,
      timer: 1500,
    });
  }



  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.files.push(file);
    this.extractBase64(file).then((image: any) => {
      this.preview = image.base;
    });
    this.notificationForm.get('image')!.setValue(file);
  }

  extractBase64 = async (event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL(event);
        const image = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL(event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            blob: event,
            image,
          });
        };
      } catch {
        console.log('error on image Upload');
      }
    });
}
