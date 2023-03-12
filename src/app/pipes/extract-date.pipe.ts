import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'extractDate' })
export class ExtractDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  }
}