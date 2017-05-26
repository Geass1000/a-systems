import { IWorkspace } from './shared/lib/workspace.class';

import { environment } from '../environments/environment';

export class Config {
	//static readonly serverUrl : string = 'http://localhost:3005/';
	//static readonly serverUrl : string = 'http://192.168.100.2:3005/';
	static readonly apiUrl : string = environment.apiUrl ? environment.apiUrl : '';
	static readonly usersUrl : string = `${Config.apiUrl}/api/users/`;
	static readonly authUrl : string = `${Config.apiUrl}/api/auth/`;
  static readonly projectUrl : string = `${Config.apiUrl}/api/project/`;
	// Editor Urls
	static readonly texturUrl : string = `${Config.apiUrl}/api/texture/`;
	static readonly texturCategoryUrl : string = `${Config.apiUrl}/api/texture/type/`;
	static readonly itemUrl : string = `${Config.apiUrl}/api/item/`;
	static readonly itemCategoryUrl : string = `${Config.apiUrl}/api/item/category/`;
	// App assets
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
