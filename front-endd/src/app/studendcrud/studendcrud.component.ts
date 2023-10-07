import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studendcrud',
  templateUrl: './studendcrud.component.html',
  styleUrls: ['./studendcrud.component.scss']
})
export class StudendcrudComponent 
{


  StudentArray : any[] = [];
  currentStudentID = "";

  name: string ="";
  email: string ="";
  address: string ="";
  phone: string ="";
  
  constructor(private http: HttpClient ) 
  {
    this.getAllStudent();
  }
  getAllStudent() {

    this.http.get("http://localhost:8000/user/getAll")
    .subscribe((resultData: any)=>
    {
       
        console.log(resultData);
        this.StudentArray = resultData.data;
    });


  }

  setUpdate(data: any) 
  {
   this.name = data.name;
   this.name = data.email;
   this.address = data.address;
   this.phone = data.phone;

   this.currentStudentID = data._id;
  
  }

  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "address" : this.address,
      "phone" : this.phone,

    };
    
    this.http.patch("http://localhost:8000/user/update"+ "/"+this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Updateddd")
        this.getAllStudent();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:8000/user/delete"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
   
    });
    }
    
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       

  }

register()
  {

    let bodyData = {
      "name" : this.name,
      "email": this.email,
      "address" : this.address,
      "phone" : this.phone, 
  };
    this.http.post("http://localhost:8000/user/create",bodyData).subscribe((resultData: any)=>
    {
      
        console.log(resultData);
        alert(resultData.message); 
         //this.getAllEmployee();
        this.name = '';
        this.email= '';
        this.address = '';
        this.phone  = '';
        this.getAllStudent();
    });
  }
}