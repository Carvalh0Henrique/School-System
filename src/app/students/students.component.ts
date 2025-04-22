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
    this.StudentService.getStudents().subscribe({
      next: (json) => { this.students = json; }
      }

    )
  } 

  save() {
    this.StudentService.saveStudent(this.formGroupStudent.value).subscribe(
      {
        next: json => {
          this.students.push(json);
          this.formGroupStudent.reset();
        }
      }
    )
  }
}
