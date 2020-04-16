import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Student } from '../../models/Student/student';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  
  serverIP:string = "localhost";
  serverPort:number = 3000;

  studentRouter:string = `http://${this.serverIP}:${this.serverPort}/students`;

  constructor(
    private http: HttpClient
  ) { }

  getStudents() {
    const path = `${this.studentRouter}/`;
    return this.http.get<Student[]>(path);
  }

  getStudent(studentid:string) { 
    const path = `${this.studentRouter}/${studentid}`;
    return this.http.get<Student>(path);
  }

  addStudent(newstudent: Student){
    const path = `${this.studentRouter}/new`;
    return this.http.post(path, newstudent);
  }
}
