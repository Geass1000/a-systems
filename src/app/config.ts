import { IWorkspace } from './shared/lib/workspace.class';

export class Config {
	//static readonly serverUrl : string = 'http://localhost:3005/';
	//static readonly serverUrl : string = 'http://192.168.100.2:3005/';
	static readonly serverUrl : string = `${window.location.protocol}//${window.location.hostname}:3005/`;
	static readonly usersUrl : string = 'api/users/';
	static readonly authUrl : string = 'api/auth/';
  static readonly projectUrl : string = 'api/project/';
	static readonly textureFolderUrl : string = 'assets/textures/';

	static readonly scale : number = 100; // Пикслей в метре
	static readonly defMeasure : string = 'px';
	/* Editor */
	static readonly projectName : string = 'Project';
	static readonly workspace : IWorkspace = {
		width : 2000,
		height : 2000,
		material : {
			type : 'none',
			data : null
		}
	};

	/* Http */
	static minRetryCount : number = 5;
	static maxRetryCount : number = 15;
	static retryDelay : number = 3000;
};
