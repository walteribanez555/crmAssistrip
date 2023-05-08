import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  isDropDownOpen : boolean = false;

  clickToggle(){
    this.isDropDownOpen = !this.isDropDownOpen;
  }



}
