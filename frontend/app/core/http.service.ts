import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Config } from '../config';

import { LoggerService } from './logger.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

@Injectable()
export class HttpService {
	constructor (private logger : LoggerService) {
	}

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
	handleError (error : Response | any) : Observable<string> {
		let errMsg: string;
		if (error instanceof Response) {
			let body : any = error.json() || '';
			errMsg = body.error || JSON.stringify(body);
			this.logger.error(`${this.constructor.name} - handleError:`, `${error.status} - ${error.statusText || ''} ${errMsg}`);
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
	}
}
