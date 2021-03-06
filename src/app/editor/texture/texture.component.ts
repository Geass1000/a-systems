import { Component, OnInit, OnDestroy } from '@angular/core';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

/* App Services */
import { LoggerService } from '../../core/logger.service';

/* App Interfaces and Classes */
import { Surface } from '../../shared/lib/surface.class';
import { Workspace } from '../../shared/lib/workspace.class';
import { Material } from '../../shared/lib/material.class';
import { MaterialTexture } from '../../shared/lib/material-texture.class';

@Component({
	moduleId: module.id,
  selector: '[as-editor-texture]',
	templateUrl: 'texture.component.html',
  styleUrls: [ 'texture.component.scss' ]
})
export class TextureComponent implements OnInit, OnDestroy {
	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'project', 'workspace']) workspace$ : Observable<Workspace>;
	@select(['editor', 'project', 'surfaces']) surfaces$ : Observable<Array<Surface>>;

	/* Public Variable */
	public surfaces : Array<Surface>;
	public workspace : Workspace;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
							 private logger : LoggerService) {
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
	 * @function
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
	 * @function
	 * @param  {Material} material - материал
	 * @return {boolean}
	 */
	isTexture (material : Material) : boolean {
		return material ? material.isType('texture') : false;
	}

	/**
	 * getWidth - функция, возвращающая ширину изображения-текстуры.
	 *
	 * @function
	 * @param  {Material} material - элемент
	 * @return {number}
	 */
	getWidth (material : Material) : number {
		return (<MaterialTexture>material.data).width;
	}

	/**
	 * getHeight - функция, возвращающая высоту изображения-текстуры.
	 *
	 * @function
	 * @param  {Material} material - элемент
	 * @return {number}
	 */
	getHeight (material : Material) : number {
		return (<MaterialTexture>material.data).height;
	}

	/**
	 * getHeight - функция, возвращающая высоту изображения-текстуры.
	 *
	 * @function
	 * @param  {Material} material - элемент
	 * @return {number}
	 */
	createTransform (material : Material) : string {
		return `rotate(${(<MaterialTexture>material.data).angle})`;
	}

	/**
	 * createId - функция, выполняющая создание идентификатора элемента.
	 *
	 * @function
	 * @param  {Array<string>} restOfId - список подидентификаторов
	 * @return {string}
	 */
	createId (...restOfId : Array<string>) : string {
		return restOfId.join('-');
	}
}
