import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
const API_URL = 'http://localhost:8000/students'; 

@Component({
  selector: 'app-studentcrud', 
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.scss']
})
export class StudentcrudComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  StudentArray: any[] = [];
  currentStudentID = '';

  name: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';

  showForm: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && !this.router.url.includes('edit')) {
        this.showStudentDetails(id);
      }
    });

    this.getAllStudent();
    this.loadNextPage();
    this.loadPreviousPage();
  }
  getAllStudent() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const apiUrl = `${API_URL}?page=${this.page}&pageSize=${this.pageSize}`;

    this.http.get(apiUrl).subscribe((resultData: any) => {
      console.log(resultData);
      this.StudentArray = resultData.data.slice(startIndex, endIndex);
    });
  }

  showStudentDetails(id: string) {
    const apiUrl = `${API_URL}/${id}`;
    this.http.get(apiUrl).subscribe((resultData: any) => {
      console.log(resultData);
      this.StudentArray = [resultData.data];
      this.name = resultData.data.name;
      this.email = resultData.data.email;
      this.address = resultData.data.address;
      this.phone = resultData.data.phone;
      this.currentStudentID = id;
      this.showForm = true;
    });
  }

  UpdateStudent() {
    const bodyData = {
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
    };

    if (this.currentStudentID) {
      const apiUrl = `${API_URL}/${this.currentStudentID}`;
      this.http.patch(apiUrl, bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        alert('Data Updated');
        this.showForm = false;
        this.getAllStudent();
      });
    } else {
      const apiUrl = API_URL;
      this.http.post(apiUrl, bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        alert('Data Created');
        this.showForm = false;
        this.getAllStudent();
      });
    }
  }

  loadNextPage() {
    this.page++;
    this.getAllStudent();
  }

  loadPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllStudent();
    }
  }

  setUpdate(data: any) {
    this.name = data.name;
    this.email = data.email;
    this.address = data.address;
    this.phone = data.phone;
    this.currentStudentID = data._id;
    this.showForm = true;
  }

  UpdateRecords() {
    let bodyData = {
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
    };

    this.http.patch(`${API_URL}/${this.currentStudentID}`, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert('Database Updated');
      this.showForm = false;
      this.getAllStudent();
    });
  }

  setDelete(data: any) {
    this.http.delete(`${API_URL}/${data._id}`).subscribe((resultData: any) => {
      console.log(resultData);
      alert('Database Deleted');
      this.getAllStudent();
    });
  }

  save() {
    if (this.currentStudentID === '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  register() {
    let bodyData = {
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
    };

    this.http.post(API_URL, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert('Registered Successfully');
      this.showForm = false;
      this.name = '';
      this.email = '';
      this.address = '';
      this.phone = '';
      this.getAllStudent();
    });
  }
}
