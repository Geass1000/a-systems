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
	handleError (error : Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} -${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		this.logger.error(errMsg);
		return Observable.throw(errMsg);
	}
}
