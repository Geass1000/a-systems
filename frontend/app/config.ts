import { IWorkspace } from './shared/interfaces/editor.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

export class Config {
	static readonly serverUrl : string = 'http://localhost:3005/';
	static readonly scale : number = 100; // Пикслей в метре
	static readonly defMeasure : string = 'px';
	/* Editor */
	static readonly workspace : IWorkspace = {
		width : 2000,
		height : 2000,
		texture : ''
	};

	/* Http */
	static minRetryCount : number = 5;
	static maxRetryCount : number = 15;
	static retryDelay : number = 3000;
};
