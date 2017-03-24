import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

@Component({
	moduleId: module.id,
  selector: 'as-editor-workstate',
	templateUrl: 'workstate.component.html',
  styleUrls: [ 'workstate.component.css' ]
})
export class WorkstateComponent implements OnInit, OnDestroy {
	title = 'Home';

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'selectElement']) selectElement$ : Observable<boolean>;
	private selectElement : boolean;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions) {
	}
	ngOnInit () {
		this.subscription.push(this.selectElement$.subscribe((data) => this.selectElement = data));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
}
