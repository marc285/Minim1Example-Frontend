import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from '../../models/Student/student';

@Injectable({
  providedIn: 'root'
})

export class DegreesService {

  serverIP:string = "localhost";
  serverPort:number = 3000;
  
  degreeRouter:string = `http://${this.serverIP}:${this.serverPort}/degrees`;

  constructor(
    private http: HttpClient
  ) { }
  
  getDegrees(){
    const path = `${this.degreeRouter}/`;
    return this.http.get<String[]>(path);
  }

  getStudentsByDegree(degreename:string){
    const path = `${this.degreeRouter}/${degreename}/students`;
    return this.http.get<Student[]>(path);
  }

}
