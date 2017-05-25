import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Config } from '../config';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

/* App Services */
import { LoggerService } from './logger.service';

@Injectable()
export class HttpService {
	constructor (private logger : LoggerService) {
	}

	/**
	 * mapData<T> - промежуточный обработчик, выполняет разбор присланных json данных и
	 * возвращающий разобранный объект или null.
	 *
	 * @method
	 *
	 * @param {Response} resp - json ответ
	 * @param {string} constructorName - имя класса, вызвавшего обработчик
	 * @param {string} methodName - имя метода, вызвавшего обработчик
	 * @return {T} - разобранный json ответ
	 */
	mapData<T> (resp : Response, constructorName : string, methodName : string) : T {
		const jResp : T = <T>resp.json() || null;
		this.logger.info(`${constructorName} - ${methodName}:`, `${resp.status} -`, jResp);
		return jResp;
	}

	/**
	 * retry - выполняет повторный вызов источника Observable в случае, если возникла ошибка.
	 *
	 * @method
	 *
	 * @param {Observable<any>} errorObs - объект вызвавший ошибку
	 * @return {Observable<string>} - объект с аккумулятором
	 */
	retry (errorObs : Observable<any>) {
		return errorObs.delay(Config.retryDelay).scan((errorCount : number, error : any) => {
			if (errorCount >= Config.minRetryCount) {
				if (error.status !== 0) {
					throw error;
				}	else if (errorCount >= Config.maxRetryCount) {
					throw error;
				}
			}
			return errorCount + 1;
		}, 0);
	}

	/**
	 * handleError<T> - обработчик ошибок, выполняет разбор и обработку ошибки.
	 *
	 * @method
	 *
	 * @param {any} error - объект ошибки
	 * @return {Observable<string>} - разобранная ошибка
	 */
	handleError (error : any) : Observable<string> {
		let errMsg : string;
		if (error instanceof Response) {
			const body : any = error.json() || '';
			errMsg = body.error || JSON.stringify(body);
			this.logger.error(`${this.constructor.name} - handleError:`, `${error.status} - ${error.statusText || ''} - ${errMsg}`);
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
	}
}
