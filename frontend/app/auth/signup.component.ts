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
      'login': ['', [
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(30)
				]
			],
			'email': ['', Validators.required],
			'password': ['', [
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(50)
				]
			]
    });

		this.signupForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

	onValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;

    for (const field in form.value) {
			this.formError[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }


	formError = {
		'login' : ''
	};
	validationMessages = {
    'login': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 3 characters long.',
      'maxlength': 'Name cannot be more than 30 characters long.'
    },
    'email': {
      'required': 'E-mail is required.'
    },
    'password': {
      'required': 'Password is required.',
			'minlength': 'Password must be at least 8 characters long.',
      'maxlength': 'Password cannot be more than 50 characters long.'
    }
  };
}
