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

@Injectable()
export class DataLoadService implements OnDestroy {
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
	 * getTextures - функция, выполняющая GET запрос на получение списка с информацией
	 * о текстурах.
	 *
	 * @function
	 * @param  {string} category - категоря текстур
	 * @return {Observable<any>}
	 */
	getTextures (category ?: string) : Observable<any> {
		this.logger.info(`${this.constructor.name} - getTextures:`, 'Textures loads...');
		let query : string = category ? `?category=${category}` : '';
		return this.http.get(Config.serverUrl + this.texturUrl + query, { headers : this.headers })
										.map((resp : Response) => {
											let jResp = resp.json() || {};
											this.logger.info(`${this.constructor.name} - getTextures:`, `status = ${resp.status} -`, jResp);
											return jResp;
										})
										.retryWhen((errorObs) => this.httpService.retry(errorObs))
										.catch(this.httpService.handleError);
	}

	/**
	 * getTextureCategories - функция, выполняющая GET запрос на получение списка с информацией
	 * о категориях текстурах.
	 *
	 * @function
	 * @return {Observable<any>}
	 */
	getTextureCategories () : Observable<any> {
		this.logger.info(`${this.constructor.name} - getTextureCategories:`, 'Texture types loads...');
		return this.http.get(Config.serverUrl + this.texturTypeUrl, { headers : this.headers })
										.map((resp : Response) => {
											let jResp = resp.json() || {};
											this.logger.info(`${this.constructor.name} - getTextureCategories:`, `status = ${resp.status} -`, jResp);
											return jResp;
										})
										.retryWhen((errorObs) => this.httpService.retry(errorObs))
										.catch(this.httpService.handleError);
	}

	/**
	 * getItems - функция, выполняющая GET запрос на получение списка с информацией
	 * о элементах.
	 *
	 * @function
	 * @return {Observable<any>}
	 */
	getItems () : Observable<any> {
		this.logger.info(`${this.constructor.name} - getItems:`, 'Items loads...');
		return this.http.get(Config.serverUrl + this.itemUrl, { headers : this.headers })
										.map((resp : Response) => {
											let jResp = resp.json() || {};
											this.logger.info(`${this.constructor.name} - getItems:`, `status = ${resp.status} -`, jResp);
											return jResp;
										})
										.retryWhen((errorObs) => this.httpService.retry(errorObs))
										.catch(this.httpService.handleError);
	}

	/**
	 * getItemCategories - функция, выполняющая GET запрос на получение списка с информацией
	 * о категориях элементов.
	 *
	 * @function
	 * @return {Observable<any>}
	 */
	getItemCategories () : Observable<any> {
		this.logger.info(`${this.constructor.name} - getItemCategories:`, 'Item catygories loads...');
		return this.http.get(Config.serverUrl + this.itemCategoryUrl, { headers : this.headers })
										.map((resp : Response) => {
											let jResp = resp.json() || {};
											this.logger.info(`${this.constructor.name} - getItemCategories:`, `status = ${resp.status} -`, jResp);
											return jResp;
										})
										.retryWhen((errorObs) => this.httpService.retry(errorObs))
										.catch(this.httpService.handleError);
	}
}
