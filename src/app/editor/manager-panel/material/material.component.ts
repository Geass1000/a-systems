import { Component, OnInit, OnDestroy } from '@angular/core';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

/* App Services */
import { LoggerService } from '../../../core/logger.service';

/* App Interfaces and Classes */
import { Material } from '../../../shared/lib/material.class';
import { MaterialColor } from '../../../shared/lib/material-color.class';
import { IElement } from '../../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-material',
	templateUrl: 'material.component.html',
  styleUrls: [ 'material.component.scss' ]
})
export class MaterialComponent implements OnInit, OnDestroy {
	/* Private variable */

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'state', 'material']) material$ : Observable<Material>;
	private material : Material;
	@select(['editor', 'state', 'activeElements']) activeElements$ : Observable<Array<IElement>>;
	private activeElements : Array<IElement>;

	/* Public variable */
	public activeMaterialCategory : string = '';
	public activeColorCategory : string = '';

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.material$.subscribe((data) => {
			if (!data) {
				return ;
			}
			this.material = new Material(data);
			this.activeMaterialCategory = this.material.type;
			if (this.material.type === 'color') {
				this.activeColorCategory = (<MaterialColor>this.material.data).type;
			}
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'Redux - material -', this.material);
		}));
		this.subscription.push(this.activeElements$.subscribe((data) => {
			if (this.activeElements) {
				this.onClickBack();
			}
			this.activeElements = data;
			this.logger.info(`${this.constructor.name} - ngOnInit:`, 'Redux - activeElements -', this.activeElements);
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	compareElement () {
	}

	/**
	 * onChangeMaterialCategory - событие, отслеживающее изменение категории материала.
	 *
	 * @kind {event}
	 * @param  {Event} event
	 * @return {type}
	 */
	onChangeMaterialCategory (event : Event) {
		if (!this.material) {
			return;
		}
		this.material.type = this.activeMaterialCategory;
		this.ngRedux.dispatch(this.editorActions.updateMaterial(this.material));
		this.logger.info(`${this.constructor.name} - onChangeMaterialCategory:`, this.activeMaterialCategory);
	}

	/**
	 * onChangeColorCategory - событие, отслеживающее изменение категории цветовой модели.
	 *
	 * @kind {event}
	 * @param  {Event} event
	 * @return {type}
	 */
	onChangeColorCategory (event : Event) {
		this.logger.info(`${this.constructor.name} - activeColorCategory:`, this.activeColorCategory);
	}

	/**
	 * onClickBack - событие, отвечающее за переход в панель 'Workstate'.
	 *
	 * @kind {event}
	 * @return {type}
	 */
	onClickBack () {
		this.ngRedux.dispatch(this.editorActions.openManagerPanel('workstate'));
	}
}
