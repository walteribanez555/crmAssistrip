import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

// register Swiper custom elements


@Component({
  selector: 'app-generar-polizas',
  templateUrl: './generar-polizas.component.html',
  styleUrls: ['./generar-polizas.component.css']
})
export class GenerarPolizasComponent implements OnInit, OnDestroy{

  


  formStepsNum = 0;
  progressSteps!: NodeListOf<Element>;
  formSteps!: NodeListOf<Element>;
  progress!: HTMLElement;


  formsTitle : string[] = [
    "Elegir Poliza",
    "Agregar extensible",
    "Llenar datos"
  ]

  formTitle: string = this.formsTitle[0];

 

  constructor() {
   }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  ngAfterViewInit() {
    this.progressSteps = document?.querySelectorAll(".progress-step");
    this.formSteps = document.querySelectorAll(".form-step");
    this.progress = document.getElementById("progress")!;
    const prevBtns = document.querySelectorAll(".btn-prev");
    const nextBtns = document.querySelectorAll(".btn-next");

    nextBtns.forEach(btn => {
      btn.addEventListener("click", ()=> {
        this.formStepsNum++;
        this.formTitle = this.formsTitle[this.formStepsNum];
        this.updateFormSteps();
        this.updateProgressbar();
      })
    })

    prevBtns.forEach(btn => {
      btn.addEventListener("click", ()=> {
        this.formStepsNum--;
        this.formTitle = this.formsTitle[this.formStepsNum];
        this.updateFormSteps();
        this.updateProgressbar();
      })
    })
  }

  updateFormSteps(){
    this.formSteps.forEach(formStep =>  {
      formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active")
    })
    this.formSteps[this.formStepsNum].classList.add("form-step-active")
  }

  updateProgressbar(){
    this.progressSteps.forEach((progressStep, idx) => {
      if(idx < this.formStepsNum + 1){
        progressStep.classList.add("progress-step-active")
      } else {
        progressStep.classList.remove("progress-step-active")
      }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");
    this.progress.style.width = ((progressActive.length - 1) / (this.progressSteps.length - 1)) * 100 + "%";
  }
}
