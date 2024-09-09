import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalContent } from 'src/app/Modules/shared/models/modal-content';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css'],
})
export class PriceFormComponent implements ModalContent, OnInit {
  ngOnInit(): void {
    console.log('form', this.form);
  }


  @Input() form!: FormGroup<any>;



}
