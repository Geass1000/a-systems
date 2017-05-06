import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

import { LoggerService } from '../../../core/logger.service';
import { MetricService } from '../../metric.service';

import { IElement } from '../../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-workstate',
	templateUrl: 'workstate.component.html',
  styleUrls: [ 'workstate.component.css' ],
	animations: [
		trigger('flyInOut', [
			state('close', style({ opacity: '1' })),
			state('open', style({
				transform: 'translateX(0)',
				opacity: '1'
			})),
			transition('void => open', [
				style({
					transform: 'translateX(100%)',
					opacity: '0'
				}),
				animate(200)
			]),
			transition('open => void', [
				animate(200, style({
					transform: 'translateX(-100%)',
					opacity: '0'
				}))
			]),
		])
	]
})
export class WorkstateComponent implements OnInit, OnDestroy {
	title = 'Home';

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'state', 'activeElements']) activeElements$ : Observable<Array<IElement>>;
	private activeElements : Array<IElement>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private metricService : MetricService) {
	}
	ngOnInit () {
		this.subscription.push(this.activeElements$.subscribe((data) => {
			this.activeElements = data;
			this.logger.info(`${this.constructor.name}:`, `Redux - activeElements -`, this.activeElements);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * ifActiveElements - функция, определяющая является ли активный элемент элементом
	 * с типом 'type'.
	 *
	 * @kind {function}
	 * @param  {string} type
	 * @return {boolean}
	 */
	ifActiveElements (type : string) : boolean {
		//this.logger.info(`${this.constructor.name}:`, `ifActiveElements - type -`, type);
		//this.logger.info(`${this.constructor.name}:`, `ifActiveElements - activeElements -`, this.activeElements);
		if (!this.activeElements || !type) {
			return false;
		}
		switch (type) {
			case 'workspace' : {
				return this.activeElements.length === 0;
			}
		}
	}
}
