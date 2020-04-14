import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/Student/student'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  
  studentsList: Student[];          //List of the current Students
  selectedStudent: Student;         //Selected Student when pressed his hame
  studentsListByStudies: Student[]; //List of Students by ID
  selectedStudy: string;            //Study of which the previous list is

  //COMPONENTS ATTRIBUTES
  visibleGetByStudies: boolean;
  visibleAddStudent: boolean;
  visibleSelectedStudent: boolean;

  constructor() { 
    this.visibleGetByStudies = false;
    this.visibleAddStudent = false;
    this.visibleSelectedStudent = false;
  }

  ngOnInit(): void {
    this.getStudents();
    this.studentsListByStudies = [];
  }

  public getStudents(){
    this.studentsList = [];               //To reset the List
    this.selectedStudent = new Student(); //To reset the selected Student
    //Rellenar lista
  }

  public getStudent(id:string, name:string){
    //let searchedStudent = new Student();
    //Search student with /students/:studentname + _id on BODY //LO PODRIAMOS SELECCIONAR DIRECTAMENTE DE LA LISTA PERO ES PARA USAR EL METODO GETSTUDENT
    //this.selectedStudent = searchedStudent;
  }

  public getStudentsByStudies(){
    this.selectedStudy = (<HTMLInputElement>document.getElementById("studiesInput")).value
    //USAR GET LISTA SEGUN STUDIES
  }

  public addStudent(){
    let newstudent = new Student();
    newstudent.phones = new Array();
    newstudent.studies = new Array();
    newstudent.name = (<HTMLInputElement>document.getElementById("studentNameInput")).value;
    newstudent.address = (<HTMLInputElement>document.getElementById("studentAddressInput")).value;
    //FOR
    newstudent.phones.push( 
      { 
        name:(<HTMLInputElement>document.getElementById("studentPhoneNameInput")).value, 
        number:(<HTMLInputElement>document.getElementById("studentPhoneNumberInput")).value
      }
    );
    //

    //FOR
    newstudent.studies.push((<HTMLInputElement>document.getElementById("studentStudyInput")).value);
    //

    alert("New student: " + newstudent.name + " " + newstudent.address + " " + newstudent.phones[0].name + ":" + newstudent.phones[0].number + " " + newstudent.studies[0]);
  }

  //COMPONENT FUNCTIONS
  public showStudent(index:number){
    this.getStudent(this.studentsList[index]._id, this.studentsList[index].name);
    this.toggleSelectedStudent();
  }

  public toggleGetByStudies(){
    this.visibleGetByStudies = !this.visibleGetByStudies;
    if(!this.visibleSelectedStudent){
      this.studentsListByStudies = [];
      this.selectedStudy = '';
    }
  }

  public toggleSelectedStudent(){
    this.visibleSelectedStudent = !this.visibleSelectedStudent;
  }

  public toggleAddStudent(){
    this.visibleAddStudent = !this.visibleAddStudent; 
  }

  public addPhoneForm(){
    //let newphone = document.querySelector('#phoneElement1').cloneNode(true);
    //newphone.
  }

  public addStudyForm(){
    //let newstudy = document.querySelector('#studyElement1').cloneNode(true);
    //newstudy.
  }
}
