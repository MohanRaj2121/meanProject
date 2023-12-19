import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
const API_URL = 'http://localhost:8000/students'; 
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() address: string = '';
  @Input() phone: string = '';
  
  @Output() saveClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  save() {
    this.saveClicked.emit({
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
  });
  }
}
