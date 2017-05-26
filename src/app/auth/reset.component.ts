import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgRedux, select } from '@angular-redux/store';
import { ModalActions } from '../actions/modal.actions';

@Component({
	moduleId: module.id,
  selector: 'as-reset',
	templateUrl: 'reset.component.html',
  styleUrls: [ 'auth.component.scss' ]
})
export class ResetComponent implements OnInit  {
	@select(['modal', 'reset']) modalOpen : any;

	resetForm : FormGroup;
	formError = {
		'serverError' : ''
	};

	constructor (private fb : FormBuilder,
						 	 private ngRedux : NgRedux<any>,
						 	 private modalActions : ModalActions) { ; }

	ngOnInit () : void {
		this.resetForm = this.fb.group({
      'email' : ['', Validators.required],
			'password' : ['', Validators.required]
    });
  }

	resetFormError () {
		for (const key in this.formError) {
			if (this.formError.hasOwnProperty(key)) {
				this.formError[key] = ' ';
			}
		}
	}

	onSubmit () {
	}

	closeModal () {
		this.ngRedux.dispatch(this.modalActions.closeActiveModal());
	}
}
