import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

import { LoggerService } from '../../../core/logger.service';
import { MetricService } from '../../metric.service';

import { Workspace } from '../../../shared/lib/workspace.class';

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
		]),
		trigger('togglePanel', [
			state('close', style({
				transform: 'translateX(100%)',
			})),
			state('open', style({
				transform: 'translateX(0)',
			})),
			transition('close <=> open', animate('200ms ease-in'))
		])
	]
})
export class WorkstateComponent implements OnInit, OnDestroy {
	title = 'Home';

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace;
	private workspaceInit : boolean = false;
	@select(['editor', 'state', 'isActiveMetric']) isActiveMetric$ : Observable<boolean>;
	private isActiveMetric : boolean = null;
	@select(['editor', 'manager', 'texture']) texture$ : Observable<boolean>;
	private texture : boolean;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private metricService : MetricService) {
	}
	ngOnInit () {
		this.subscription.push(this.texture$.subscribe((data) => this.texture = data));
		this.subscription.push(this.workspace$.subscribe((data) => {
			this.workspace = new Workspace(data);
			if (this.isActiveMetric && !this.workspaceInit) {
				this.workspace.width = +this.metricService.convertFromDefToCur(this.workspace.width);
				this.workspace.height = +this.metricService.convertFromDefToCur(this.workspace.height);
				this.workspaceInit = true;
			}
		}));
		this.subscription.push(this.isActiveMetric$.subscribe((data) => {
			this.isActiveMetric = data;
			if (this.isActiveMetric) {
				if (!this.workspaceInit) {
					this.workspace.width = +this.metricService.convertFromDefToCur(this.workspace.width);
					this.workspace.height = +this.metricService.convertFromDefToCur(this.workspace.height);
					this.workspaceInit = true;
				} else {
					this.workspace.width = +this.metricService.convertFromPrevToCur(this.workspace.width);
					this.workspace.height = +this.metricService.convertFromPrevToCur(this.workspace.height);
				}
			}
			this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux - isActiveMetric -', this.isActiveMetric);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	onAccept () {
		return true;
	}
}
