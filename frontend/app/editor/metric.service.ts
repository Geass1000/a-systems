import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';

import { Config } from '../config';

import { HttpService } from '../core/http.service';
import { LoggerService } from '../core/logger.service';

let Measure : Map<string, number> = new Map<string, number>([
	['m', 1],	['cm', 100], ['px', Config.scale]
]);

@Injectable()
export class MetricService implements OnDestroy {
	private defMeasure : string = Config.defMeasure;
	private prevMeasure : string = this.defMeasure;

	private isInit : boolean = false;
	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'all', 'isActiveMetric']) isActiveMetric$ : Observable<boolean>;
	private isActiveMetric : boolean = null;
	@select(['editor', 'all', 'curMeasure']) curMeasure$ : Observable<string>;
	private curMeasure : string = null;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService) {
		this.subscription.push(this.isActiveMetric$.subscribe((data) => {
			this.isActiveMetric = data;
		}));
		this.subscription.push(this.curMeasure$.subscribe((data) => {
			this.deactive();
			this.prevMeasure = this.curMeasure ? this.curMeasure : this.prevMeasure;
			this.curMeasure = data;
			this.active();
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
	active () {
		if (this.defMeasure && this.curMeasure) {
			this.logger.info(`${this.constructor.name}:`, `active - prevMeasure: ${this.prevMeasure}, curMeasure: ${this.curMeasure}`);
			this.ngRedux.dispatch(this.editorActions.activeMetric(true));
		}
	}
	deactive () {
		if (this.isActiveMetric) {
			this.logger.info(`${this.constructor.name}:`, 'deactive');
			this.ngRedux.dispatch(this.editorActions.activeMetric(false));
		}
	}

	convertFromDefToCur (num : number) {
		return this.convertor({ from : this.defMeasure, to : this.curMeasure }, num);
	}
	convertFromCurToDef (num : number) {
		return this.convertor({ from : this.curMeasure, to : this.defMeasure }, num);
	}
	convertFromPrevToCur (num : number) {
		return this.convertor({ from : this.prevMeasure, to : this.curMeasure }, num);
	}
	convertor (dir : { from : string, to : string }, num : number) {
		if (!(dir.from && dir.to)) {
			return num;
		}

		let fromScale : number = Measure.get(dir.from);
		let toScale : number = Measure.get(dir.to);
		if (!(fromScale && toScale)) {
			return num
		};

		let cof : number = toScale / fromScale;
		return cof * num;
	}
}
