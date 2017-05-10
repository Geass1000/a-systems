import { IWorkspace } from './shared/lib/workspace.class';

export class Config {
	static readonly serverUrl : string = 'http://localhost:3005/';
	static readonly scale : number = 100; // Пикслей в метре
	static readonly defMeasure : string = 'px';
	/* Editor */
	static readonly projectName : string = 'Project';
	static readonly workspace : IWorkspace = {
		width : 2000,
		height : 2000,
		material : null
	};

	/* Http */
	static minRetryCount : number = 5;
	static maxRetryCount : number = 15;
	static retryDelay : number = 3000;
};
