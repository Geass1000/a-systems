import { Injectable, OnDestroy } from '@angular/core';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';
import 'rxjs/add/observable/forkJoin';

/* App Services */
import { LoggerService } from '../core/logger.service';
import { EditorService } from './editor.service';

/* App Interfaces and Classes */
import { Workspace } from '../shared/lib/workspace.class';

@Injectable()
export class DataInitService implements OnDestroy {
	private isInit : Map<string, boolean> = new Map([
		['request', false], ['workspace', false], ['material', false]
	]);

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
							 private editorService : EditorService) {
		this.subscription.push(this.workspace$.subscribe((data) => {
 			this.workspace = data;
 		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * initData - функция, обеспечивающая вызыв всех функций, необходимых для
	 * инициализации данных.
	 *
	 * @function
	 * @return {void}
	 */
	initData () : void {
		this.logger.info(`${this.constructor.name} - initData:`, 'Data initialization...');
		this.initLoadData();
		this.initWorkspace();
		this.initMaterial();
	}

	/**
	 * isInitAll - функция, обеспечивающая проверку состояния всех инициализирующих
	 * функций. Состояния бывают 2х видов: выполнено и не выполнено.
	 *
	 * @function
	 * @return {void}
	 */
	isInitAll () : void {
		const values = Array.from(this.isInit.values());
		const isInitAllValues = values.every((data) => { return data; });
		this.logger.info(`${this.constructor.name} - isInitAll:`, 'Initialization -', isInitAllValues);
		if (isInitAllValues) {
			this.ngRedux.dispatch(this.editorActions.initProject(true));
		}
	}

	/**
	 * initLoadData - функция, обеспечивающая вызов всех методов загрузки структур
	 * данных из сервера.
	 *
	 * @function
	 * @return {void}
	 */
	initLoadData () : void {
		if (this.isInit.get('request')) {
			return ;
		}
		Observable.forkJoin([
			this.editorService.getItemCategories(),
			this.editorService.getTextureCategories(),
			this.editorService.getTextures(),
			this.editorService.getItems()
		]).subscribe(
			(res) => {
				if (res[0].categories && res[0].categories.length !== 0) {
					this.ngRedux.dispatch(this.editorActions.addItemCategories(res[0].categories));
				}
				if (res[1].categories && res[1].categories.length !== 0) {
					this.ngRedux.dispatch(this.editorActions.addTextureCategories(res[1].categories));
				}
				if (res[2].textures && res[2].textures.length !== 0) {
					this.ngRedux.dispatch(this.editorActions.addTextures(res[2].textures));
				}
				if (res[3].items && res[3].items.length !== 0) {
					this.ngRedux.dispatch(this.editorActions.addItems(res[3].items));
				}

				this.logger.info(`${this.constructor.name} - initLoadData:`, 'Initialization -', res);
				this.isInit.set('request', true);
				this.isInitAll();
			}
		);
	}

	/**
	 * initWorkspace - функция, рассчитывающая смещение камеры в центральную
	 * позицию рабочего пространства.
	 *
	 * @function
	 * @return {void}
	 */
	initWorkspace () : void {
		const windowWidth : number = document.documentElement.clientWidth;
		const windowHeight : number = document.documentElement.clientHeight;

		const halfWindowWidth : number = windowWidth / 2;
		const halfWindowHeight : number = windowHeight / 2;

		const halfWorkspaceWidth : number = this.workspace.width / 2;
		const halfWorkspaceHeight : number = this.workspace.height / 2;

		const workspaceX = halfWindowWidth - halfWorkspaceWidth;
		const workspaceY = halfWindowHeight - halfWorkspaceHeight;
		this.ngRedux.dispatch(this.editorActions.translateToWorkspace([workspaceX, workspaceY]));

		this.logger.info(`${this.constructor.name} - initWorkspace:`, `Initialization - X - ${workspaceX} - Y - ${workspaceY}`);
		this.isInit.set('workspace', true);
		this.isInitAll();
	}

	initMaterial () : void {
		this.ngRedux.dispatch(this.editorActions.setMaterial(this.workspace.material));
		this.isInit.set('material', true);
		this.isInitAll();
	}
}
