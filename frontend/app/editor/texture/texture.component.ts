import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { LoggerService } from '../../core/logger.service';

import { Surface } from '../../shared/lib/surface.class';
import { Workspace } from '../../shared/lib/workspace.class';
import { Material } from '../../shared/lib/material.class';
import { MaterialTexture } from '../../shared/lib/material-texture.class';

@Component({
	moduleId: module.id,
  selector: '[as-editor-texture]',
	templateUrl: 'texture.component.html',
  styleUrls: [ 'texture.component.css' ]
})
export class TextureComponent implements OnInit, OnDestroy {
	private loc : string = '';
	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	private workspace : Workspace;
	@select(['editor', 'project', 'surfaces']) surfaces$ : Observable<Array<Surface>>;
	private surfaces : Array<Surface>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
							 private logger : LoggerService) {
		this.loc = location.href;
	}
	ngOnInit () {
		this.subscription.push(this.workspace$.subscribe((data) => {
			this.workspace = data;
		}));
		this.subscription.push(this.surfaces$.subscribe((data) => {
			this.surfaces = data;
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * getSrc - функция, возвращающая путь к файлу-изображению с текстурой.
	 *
	 * @kind {function}
	 * @param  {Material} material - материал
	 * @return {string}
	 */
	getSrc (material : Material) : string {
		return (<MaterialTexture>material.data).getSrc();
	}

	/**
	 * isTexture - функция, выполняющая проверку типа материала, к принадлежности
	 * к текстурному типу.
	 *
	 * @kind {function}
	 * @param  {Material} material - материал
	 * @return {boolean}
	 */
	isTexture (material : Material) : boolean {
		return material ? material.isType('texture') : false;
	}

	/**
	 * getWidth - функция, возвращающая ширину изображения-текстуры.
	 *
	 * @kind {function}
	 * @param  {Material} material - элемент
	 * @return {number}
	 */
	getWidth (material : Material) : number {
		return (<MaterialTexture>material.data).width;
	}

	/**
	 * getHeight - функция, возвращающая высоту изображения-текстуры.
	 *
	 * @kind {function}
	 * @param  {Material} material - элемент
	 * @return {number}
	 */
	getHeight (material : Material) : number {
		return (<MaterialTexture>material.data).height;
	}

	/**
	 * createId - функция, выполняющая создание идентификатора элемента.
	 *
	 * @kind {function}
	 * @param  {Array<string>} restOfId - список подидентификаторов
	 * @return {string}
	 */
	createId (...restOfId : Array<string>) : string {
		return restOfId.join('-');
	}
}
