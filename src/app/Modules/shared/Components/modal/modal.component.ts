import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Type, ViewChild, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DcDirective } from '../../directives/dc.directive';
import { ModalContent } from '../../models/modal-content';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() title?: string = 'Agregar Elemento';
  // @Input() iconPath?: string = 'assets/icons/heroicons/outline/plus.svg';
  @Input() size: string = 'md';
  @Input() form!: FormGroup;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  @Input() component!: Type<any>;

  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  private cdr = inject(ChangeDetectorRef);

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  close() {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit() {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit(this.form);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<ModalContent>(
      this.component
    );

    componentRef.instance.form= this.form;



    // Manually trigger change detection
    this.cdr.detectChanges();
  }


 }
