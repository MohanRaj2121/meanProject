import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  @Output() startRegistration = new EventEmitter<void>();
  showForm: boolean = false;
  constructor() {}

  onBeginClick() {
    this.startRegistration.emit();
  }
}



