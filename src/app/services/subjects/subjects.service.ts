import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from '../../models/Subject/subject'

@Injectable({
  providedIn: 'root'
})

export class SubjectsService {

  serverIP:string = "localhost";
  serverPort:number = 3000;
  
  subjectRouter:string = `http://${this.serverIP}:${this.serverPort}/subjects`;

  constructor(
    private http: HttpClient
  ) { }

  getSubjects() {
    const path = `${this.subjectRouter}/`;
    return this.http.get<Subject[]>(path);
  }

  getSubject(subjectname:string){
    //Not used as we directly use getStudents, which returns the Subject populated with the Students in "students" field (as defined in the Subject model)
    const path = `${this.subjectRouter}/${subjectname}`;
    return this.http.get<Subject>(path);
  }

  getStudents(subjectname:string){
    const path = `${this.subjectRouter}/${subjectname}/students`;
    return this.http.get<Subject>(path);
  }

  addSubject(newsubject:Subject){
    const path = `${this.subjectRouter}/new`;
    return this.http.post(path, newsubject);
  }

  addStudentToSubject(subjectname:string, studentid:string){
    const path = `${this.subjectRouter}/${subjectname}/addStudent`;
    let reqBody = {
      "_id": `${studentid}`
    }
    return this.http.put(path, reqBody);
  }
}
