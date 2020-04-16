import { Component, OnInit } from '@angular/core';

import { Subject } from '../../models/Subject/subject'
import { Student } from '../../models/Student/student'
import { SubjectsService } from '../../services/subjects/subjects.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjectsList: Subject[];          //List of the current Subjects
  selectedSubject: Subject;         //Selected Subject when pressed its name (Filled with Students)     
  
  //COMPONENTS ATTRIBUTES
  visibleAddSubject: boolean;
  visibleSelectedSubject: boolean;
  visibleAddStudentToSubject: boolean;


  addSubjectForm = new FormGroup({
    subjectNameInput: new FormControl('', Validators.required)
  });

  addStudentToSubjectForm = new FormGroup({
    studentIdInput: new FormControl('', Validators.required)
  });

  constructor(
    private subjectsService: SubjectsService
  ) {}

  ngOnInit(): void {
    this.getSubjects();

    this.visibleAddSubject = false;
    this.visibleSelectedSubject = false;
    this.visibleAddStudentToSubject = false;
  }

  public getSubjects(){
    this.subjectsList = [];               //To reset the List
    this.selectedSubject = new Subject(); //To reset the selected Subject
    
    this.subjectsService.getSubjects()
    .subscribe(res => {
      this.subjectsList = res as Subject[];
      console.log(res);
    });
  }

  public getSubject(name:string){ //id don't needed as Subjects are UNIQUE (name)
    //Returns the Subject with the Students in it
    this.subjectsService.getStudents(name)
    .subscribe(res => {
      this.selectedSubject = res as Subject;
    });
  }

  public addSubject(){
    let newSubject = new Subject();
    newSubject.name = this.addSubjectForm.get('subjectNameInput').value

    this.subjectsService.addSubject(newSubject)
    .subscribe(res => {
      let addedSubject = res as Subject;
      if(addedSubject.name == newSubject.name)
        alert(`Subject ${addedSubject.name} created successfully`);
      else
        alert(`Error creating the Subject ${addedSubject.name}`)
    });

    this.toggleAddSubject();
  }

  public addStudentToSubject(){
    let newStudentId: string = this.addStudentToSubjectForm.get('studentIdInput').value;
    
    this.subjectsService.addStudentToSubject(this.selectedSubject.name,newStudentId)
    .subscribe((res) => {
      alert(res);
    });

    this.toggleAddStudentToSubject();
  }

  //COMPONENT FUNCTIONS
  public showSubject(index:number){
    this.getSubject(this.subjectsList[index].name);
    this.toggleSelectedSubject(); //Activates the Selected Subject card
  }

  public toggleAddStudentToSubject(){
    this.visibleAddStudentToSubject = !this.visibleAddStudentToSubject;
  }

  public toggleSelectedSubject(){
    this.visibleSelectedSubject = !this.visibleSelectedSubject;
    if(!this.visibleSelectedSubject)
      this.selectedSubject = new Subject(); //Reset the selected Subject
  }

  public toggleAddSubject(){
    this.visibleAddSubject = !this.visibleAddSubject;
  }
}
