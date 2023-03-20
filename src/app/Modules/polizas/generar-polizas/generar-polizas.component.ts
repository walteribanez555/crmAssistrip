import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';


// register Swiper custom elements


@Component({
  selector: 'app-generar-polizas',
  templateUrl: './generar-polizas.component.html',
  styleUrls: ['./generar-polizas.component.css']
})
export class GenerarPolizasComponent implements OnInit, OnDestroy{

  
  @ViewChild('tagInput') tagInput?: ElementRef;
  @ViewChild('tagList') tagList?: ElementRef;
  @ViewChild('tagNumber') tagNumber!: ElementRef;

  maxTags: number = 10;
  tags: string[] = [];

  countTags() {
    this.tagInput?.nativeElement.focus();
    this.tagNumber.nativeElement.innerText = this.maxTags - this.tags.length;
  }

  createTag() {
    if(this.tagList){
      this.tagList.nativeElement.innerHTML = '';
      this.tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag} <i class="uit uit-multiply" (click)="remove(tag)"></i></li>`;
        this.tagList?.nativeElement.insertAdjacentHTML('afterbegin', liTag);
        console.log("Hola");
      });
      this.countTags();
    }
    
  }

  remove(tag: string) {
    let index = this.tags.indexOf(tag);
    this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
    this.createTag();
  }

  addTag(event: any) {
    if (event.key === 'Enter') {
      let tag = event.target.value.replace(/\s+/g, ' ');
      this.insertTag(tag);
      event.target.value = '';
    }
  }

  insertTag(tag: string) {
    if(tag!=="pais"){

      if (tag.length > 1 && !this.tags.includes(tag)) {
        if (this.tags.length < 10) {
          tag.split(',').forEach(tag => {
            this.tags.push(tag);
            this.createTag();
          });
        }
      }
    }
  }

  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedValue = target.value;
      this.insertTag(selectedValue);
      // Do something with the selected value here
    }
  }




  // formStepsNum = 0;
  // progressSteps?: NodeListOf<Element>;
  // formSteps?: NodeListOf<Element>;
  // progress?: HTMLElement | null ;


  // formsTitle : string[] = [
  //   "Elegir Poliza",
  //   "Agregar extensible",
  //   "Llenar datos"
  // ]

  // formTitle: string = this.formsTitle[0];

 

  constructor() {
   }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  ngAfterViewInit() {
    
      // this.progressSteps = document.querySelectorAll(".progress-step");
      // this.formSteps = document.querySelectorAll(".form-step");
      // this.progress = document.getElementById("progress");
        
      // const prevBtns = document.querySelectorAll(".btn-prev");
      // const nextBtns = document.querySelectorAll(".btn-next");
  
      // rest of your code here
      // nextBtns.forEach(btn => {
      //   btn.addEventListener("click", ()=> {
      //     this.formStepsNum++;
      //     this.formTitle = this.formsTitle[this.formStepsNum];
      //     this.updateFormSteps();
      //     this.updateProgressbar();
      //   })
      // })
  
      // prevBtns.forEach(btn => {
      //   btn.addEventListener("click", ()=> {
      //     this.formStepsNum--;
      //     this.formTitle = this.formsTitle[this.formStepsNum];
      //     this.updateFormSteps();
      //     this.updateProgressbar();
      //   })
      // })
    

    
  }

  // updateFormSteps(){

    
  //   // this.formSteps?.forEach(formStep =>  {
  //   //   formStep.classList.contains("form-step-active") &&
  //   //   formStep.classList.remove("form-step-active")
  //   // })
  //   // if(this.formSteps){
  //   //   this.formSteps[this.formStepsNum].classList.add("form-step-active")
  //   // }
    
  // }

  // updateProgressbar(){

    
  //   // this.progressSteps?.forEach((progressStep, idx) => {
  //   //   if(idx < this.formStepsNum + 1){
  //   //     progressStep.classList.add("progress-step-active")
  //   //   } else {
  //   //     progressStep.classList.remove("progress-step-active")
  //   //   }
  //   // });

  //   // const progressActive = document.querySelectorAll(".progress-step-active");
  //   // if (this.progress) {
  //   //   this.progress.style.width = ((progressActive.length - 1) / (this.progressSteps!.length - 1)) * 100 + "%";
  //   // }
    
    
  // }

  
}
