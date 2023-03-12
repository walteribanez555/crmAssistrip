import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamCheckerService {

  constructor() { }

  checkStringOrNumber(value: any): boolean {
    return typeof value === 'string' || typeof value === 'number';
  }
}
