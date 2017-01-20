import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	moduleId: module.id,
  selector: 'as-signup',
	templateUrl: 'signup.component.html',
  styleUrls: [ 'signup.component.css' ]
})
export class SignupComponent implements OnInit  {
	title = 'Signup';

	signupForm : FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.signupForm = this.fb.group({
      'login': ['', Validators.required],
			'email': ['', Validators.required],
			'password': ['', Validators.required]
    });
  }

	formError = {
		'login' : ''
	};
}
