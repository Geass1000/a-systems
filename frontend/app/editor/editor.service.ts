import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Config } from '../config';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/forkJoin';

/* App Services */
import { LoggerService } from '../core/logger.service';
import { HttpService } from '../core/http.service';

/* App Interfaces and Classes */
import { IRItem, IRItemCategory, IRTexture, IRTextureCategory } from '../shared/interfaces/editor.interface';

@Injectable()
export class EditorService implements OnDestroy {
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private texturUrl = 'api/texture';
	private texturTypeUrl = 'api/texture/type';
	private itemUrl = 'api/item';
	private itemCategoryUrl = 'api/item/category';

	constructor (private http : Http,
							 private logger : LoggerService,
						 	 private httpService : HttpService) {
	}
	ngOnDestroy () {
	}

	/**
	 * getTextures - функция-запрос, выполняет получение списка текстур (информация) от сервера.
	 *
	 * @method
	 *
	 * @param  {string} category - категоря текстур
	 * @return {Observable<IRTexture>}
	 */
	getTextures (category ?: string) : Observable<IRTexture | string> {
		let methodName : string = 'getTextures';
		this.logger.info(`${this.constructor.name} - ${methodName}:`, 'Textures loads...');

		let query : string = category ? `?category=${category}` : '';

		return this.http.get(Config.serverUrl + this.texturUrl + query, { headers : this.headers })
			.map<Response, IRTexture>((resp : Response) => {
				return this.httpService.mapData<IRTexture>(resp, this.constructor.name, methodName);
			})
			.retryWhen((errorObs) => this.httpService.retry(errorObs))
			.catch<any, string>((error : any) => this.httpService.handleError(error));
	}

	/**
	 * getTextureCategories - функция-запрос, выполняет получение списка c категориями
	 * текстур (информация) от сервера.
	 *
	 * @method
	 *
	 * @return {Observable<IRTextureCategory>}
	 */
	getTextureCategories () : Observable<IRTextureCategory | string> {
		let methodName : string = 'getTextureCategories';

		return this.http.get(Config.serverUrl + this.texturTypeUrl, { headers : this.headers })
			.map<Response, IRTextureCategory>((resp : Response) => {
				return this.httpService.mapData<IRTextureCategory>(resp, this.constructor.name, methodName);
			})
			.retryWhen((errorObs) => this.httpService.retry(errorObs))
			.catch<any, string>((error : any) => this.httpService.handleError(error));
	}

	/**
	 * getItems - функция-запрос, выполняет получение списка элементов (информация) от сервера.
	 *
	 * @method
	 *
	 * @return {Observable<IRItem>}
	 */
	getItems () : Observable<IRItem | string> {
		let methodName : string = 'getItems';

		return this.http.get(Config.serverUrl + this.itemUrl, { headers : this.headers })
			.map<Response, IRItem>((resp : Response) => {
				return this.httpService.mapData<IRItem>(resp, this.constructor.name, methodName);
			})
			.retryWhen((errorObs) => this.httpService.retry(errorObs))
			.catch<any, string>((error : any) => this.httpService.handleError(error));
	}

	/**
	 * getItemCategories - функция-запрос, выполняет получение списка c категориями
	 * элементов (информация) от сервера.
	 *
	 * @method
	 *
	 * @param  {string} category - категоря текстур
	 * @return {Observable<IRItemCategory>}
	 */
	getItemCategories (category ?: string) : Observable<IRItemCategory | string> {
		let methodName : string = 'getItemCategories';

		let query : string = category ? `?category=${category}` : '';

		return this.http.get(Config.serverUrl + this.itemCategoryUrl + query, { headers : this.headers })
			.map<Response, IRItemCategory>((resp : Response) => {
				return this.httpService.mapData<IRItemCategory>(resp, this.constructor.name, methodName);
			})
			.retryWhen((errorObs) => this.httpService.retry(errorObs))
			.catch<any, string>((error : any) => this.httpService.handleError(error));
	}
}
