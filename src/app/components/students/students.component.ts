import { Component, OnInit } from '@angular/core';

import { Student } from '../../models/Student/student'
import { StudentsService } from '../../services/students/students.service';
import { DegreesService } from '../../services/degrees/degrees.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  
  addStudentForm = new FormGroup({
    studentNameInput: new FormControl('', [Validators.required, Validators.min(2)]),  //Example of Validator would be one that requires a name of 2 or more letters
    studentAddressInput: new FormControl('', Validators.required),
    //FOR
    studentPhoneNameInput: new FormControl('', [Validators.required, Validators.min(2)]),
    studentPhoneNumberInput: new FormControl('', Validators.required),
    //
    //FOR
    studentStudyInput: new FormControl('', Validators.required)
    //
  });

  getByStudiesForm = new FormGroup({
    getByStudiesInput: new FormControl('', Validators.required)
  });

  constructor(
    private studentsService: StudentsService,
    private degreesService: DegreesService
  ) {}

  ngOnInit(): void {
    this.getStudents();

    this.visibleGetByStudies = false;
    this.visibleAddStudent = false;
    this.visibleSelectedStudent = false;
    this.studentsListByStudies = [];
  }

  public getStudents(){
    this.studentsList = [];               //To reset the List
    this.selectedStudent = new Student(); //To reset the selected Student
    
    this.studentsService.getStudents()
    .subscribe(res =>{
      this.studentsList = res as Student[];
      console.log(res);
    });
  }

  public getStudent(studentid:string){
    //We could do it by getting the Student directly from the list but we will use the API Endpoint in order to test it
    this.studentsService.getStudent(studentid)
    .subscribe(res =>{
      this.selectedStudent = res[0] as Student; //We receive the response as an array (that only contains one element) of JSONs 
    });
  }

  /* public getStudent(selstudent:Student){
    //I make the "cheat" of picking it from the studentsList as I can't do a GET with a Body
    this.selectedStudent = selstudent;
  } */

  public getStudentsByStudies(){
    this.selectedStudy = this.getByStudiesForm.get('getByStudiesInput').value
    this.degreesService.getStudentsByDegree(this.selectedStudy)
    .subscribe(res => {
      this.studentsListByStudies = res as Student [];
    });
  }

  public addStudent(){
    let newstudent = new Student();
    newstudent.phones = new Array();
    newstudent.studies = new Array();
    
    newstudent.name = this.addStudentForm.get('studentNameInput').value;
    newstudent.address = this.addStudentForm.get('studentAddressInput').value;

    //FOR
    newstudent.phones.push( 
      { 
        name: this.addStudentForm.get('studentPhoneNameInput').value,
        number:this.addStudentForm.get('studentPhoneNumberInput').value
      }
    );
    //

    //FOR
    newstudent.studies.push(this.addStudentForm.get('studentStudyInput').value);
    //

    this.studentsService.addStudent(newstudent)
    .subscribe(res =>{
      let addedStudent = res as Student;
      if ((newstudent.name == addedStudent.name) && (newstudent.address == addedStudent.address)) //Checking somehow that the added Student is exactly what we expected
        alert(`Student ${addedStudent.name} successfully created`);
      else 
        alert(`Error creating Student ${addedStudent.name}`);
    });

    this.toggleAddStudent();
  }

  //COMPONENT FUNCTIONS
  public showStudent(index:number){
    this.getStudent(this.studentsList[index]._id);
    
    //let selected:Student = this.studentsList[index];
    //this.getStudent(selected);
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
    if(!this.visibleSelectedStudent)
      this.selectedStudent = new Student(); //To reset the selected Student
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
