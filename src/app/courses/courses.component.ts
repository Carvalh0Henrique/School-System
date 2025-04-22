import { Component, OnInit } from '@angular/core';
import { Course } from '../courses';
import { CoursesService } from '../courses.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  formGroupCourse: FormGroup;

  constructor(private CoursesService: CoursesService,
              private formBuilder: FormBuilder
  ) { 
    this.formGroupCourse = formBuilder.group({
      id : [''],
      name: [''],
      price: [''],
      active: [false],
      promotion: [false]
    });
  }

  ngOnInit(): void {
    this.CoursesService.getCourses().subscribe({
      next: (json) => { this.courses = json; }
    })
    
  }

  save() {
    this.CoursesService.saveCourse(this.formGroupCourse.value).subscribe(
      {
        next: json => {
          this.courses.push(json);
          this.formGroupCourse.reset();
        }
      }
    )
  }

}
