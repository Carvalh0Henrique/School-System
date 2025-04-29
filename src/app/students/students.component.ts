import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  formGroupStudent : FormGroup;
  isEditing: boolean = false;

  constructor(private StudentService: StudentService,
              private formBuilder: FormBuilder
  ) { 
    this.formGroupStudent = formBuilder.group({
        id : [''],
        name : [''],
        course : ['']
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  } 

  loadStudents(){
    this.StudentService.getAll().subscribe({
      next: (json) => { this.students = json; }
      }
    )
  }

  save() {
    this.StudentService.save(this.formGroupStudent.value).subscribe(
      {
        next: json => {
          this.students.push(json);
          this.formGroupStudent.reset();
        }
      }
    )
  }

  delete(student: Student) {
    this.StudentService.delete(student).subscribe(
      {
        next:() => this.loadStudents()      
      }
    )
  }

  onClickUpdate(student: Student) {
    this.isEditing = true;
    this.formGroupStudent.setValue(student);
  }

  update() {
      this.StudentService.update(this.formGroupStudent.value).subscribe(
        {
          next: () => {
            this.loadStudents();
            this.clear();
          }
        }
      )
  }

  clear() {
    this.isEditing = false;
    this.formGroupStudent.reset();
  }
}
