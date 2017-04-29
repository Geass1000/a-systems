import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../../actions/editor.actions';

import { EditorService } from '../../editor.service';
import { LoggerService } from '../../../core/logger.service';
import { ITexture, ITextureCategory } from '../../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-manager-texture',
	templateUrl: 'texture.component.html',
  styleUrls: [ 'texture.component.css' ]
})
export class TextureComponent implements OnInit, OnDestroy {
	/* Private variable */
	private activeTextureId : string = null;
	private activeTextureTypeId : string = '';
	private texturesView : Array<ITexture> = [];

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'texture', 'types']) textureTypes$ : Observable<Map<string, ITextureCategory>>;
	private textureTypesData : Map<string, ITextureCategory> = new Map();
	private textureTypes : Array<ITextureCategory> = [];
	@select(['editor', 'texture', 'loaded']) textureLoaded$ : Observable<Map<string, boolean>>;
	private textureLoadedData : Map<string, boolean> = new Map();
	@select(['editor', 'texture', 'textures']) textures$ : Observable<Map<string, ITexture>>;
	private textures : Array<ITexture> = [];

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private editorService : EditorService,
						 	 private logger : LoggerService) {
		this.activeTextureId = null;
	}
	ngOnInit () {
		this.subscription.push(this.textureLoaded$.subscribe((data) => {
			this.textureLoadedData = data;
		}));

		this.subscription.push(this.textureTypes$.subscribe((data) => {
			this.textureTypesData = data;
			this.textureTypes = Array.from(data.values());

			if (data.size === 0) {
				this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux -', 'Load texture types...');
				this.editorService.getTextureTypes().subscribe((d2) => {
					if (d2.types && d2.types.length !== 0) {
						this.ngRedux.dispatch(this.editorActions.addTextureCategories(d2.types));
					}
				}, (error) => {});
			}
		}));

		this.subscription.push(this.textures$.subscribe((data) => {
			this.textures = Array.from(data.values());

			if (data.size !== 0) {
				this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux -', 'Use loaded textures...');
				this.texturesView = this.textures.filter((d2) => d2._cid === this.activeTextureTypeId);
			}
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	textureChange (_id_texture : string) {
		this.logger.info(`${this.constructor.name}:`, 'textureChange -', '...');
	}

	onChangeTextureType (event : any) {
		this.logger.info(`${this.constructor.name}:`, 'onChangeTextureType -',
			`${this.activeTextureTypeId} = ${this.textureTypesData.get(this.activeTextureTypeId).name}`);

		if (this.textureLoadedData.get(this.activeTextureTypeId)) {
			this.logger.info(`${this.constructor.name}:`, 'onChangeTextureType -', 'Use loaded textures...');
			this.texturesView = this.textures.filter((data) => data._cid === this.activeTextureTypeId);
		}	else {
			this.logger.info(`${this.constructor.name}:`, 'onChangeTextureType -', 'Load textures...');
			this.editorService.getTextures(this.activeTextureTypeId).subscribe((data) => {
				this.texturesView = [];
				if (data.textures && data.textures.length !== 0) {
					this.ngRedux.dispatch(this.editorActions.addTextures(data.textures));
				}
			}, (error) => {});
		}
	}
}
