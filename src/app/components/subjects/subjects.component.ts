import { Component, OnInit } from '@angular/core';
import { Subject } from '../../models/Subject/subject'
import { Student } from '../../models/Student/student'

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjectsList: Subject[];          //List of the current Subjects
  selectedSubject: Subject;         //Selected Subject when pressed its name
  
  //COMPONENTS ATTRIBUTES
  visibleAddSubject: boolean;
  visibleSelectedSubject: boolean;
  visibleAddStudentToSubject: boolean;

  constructor() { 
    this.visibleAddSubject = false;
    this.visibleSelectedSubject = false;
    this.visibleAddStudentToSubject = false;
  }

  ngOnInit(): void {
    this.getSubjects();

  }

  public getSubjects(){
    this.subjectsList = [];               //To reset the List
    this.selectedSubject = new Subject(); //To reset the selected Subject
    //Rellenar lista
  }

  public getStudents(name:string){ //id don't needed as Subjects are UNIQUE (name)
    //Returns the Subject with the Students in it
  }

  public addSubject(){
    let newSubject = new Subject();
    newSubject.name = ((<HTMLInputElement>document.getElementById("subjectNameInput")).value);
  }

  public addStudentToSubject(){
    let newStudentId: string = ((<HTMLInputElement>document.getElementById("subjectIdInput")).value);

    //Function of add student to the {SELECTED SUBJECT} con el {newstudentid}
  }

  //COMPONENT FUNCTIONS
  public showSubject(index:number){
    this.selectedSubject = this.subjectsList[index];
    this.toggleSelectedSubject(); //Activates the Selected Subject card
  }

  public toggleAddStudentToSubject(){
    this.visibleAddStudentToSubject = !this.visibleAddStudentToSubject;
  }

  public toggleSelectedSubject(){
    this.visibleSelectedSubject = !this.visibleSelectedSubject;
    this.selectedSubject = new Subject(); //Reset the selected Subject
  }

  public toggleAddSubject(){
    this.visibleAddSubject = !this.visibleAddSubject;
  }
}
