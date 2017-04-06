import { IWorkspace } from './shared/interfaces/editor.interface';

export class Config {
	static readonly serverUrl : string = 'http://localhost:3005/';
	static readonly scale : number = 100; // Пикслей в метре
	/* Editor */
	static readonly workspace : IWorkspace = {
		width : 2000,
		height : 2000,
		texture : {
			_id_texture : null,
			_id_tile : null
		}
	};
};
