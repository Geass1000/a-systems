import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { EditorService } from '../editor.service';
import { LoggerService } from '../../core/logger.service';
import { ITexture, ITextureType } from '../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-radio-texture',
	templateUrl: 'radio-texture.component.html',
  styleUrls: [ 'radio-texture.component.css' ]
})
export class RadioTextureComponent implements OnInit, OnDestroy {
	/* Private variable */
	private activeTextureId : string = null;
	private activeTextureTypeId : string = "";
	private texturesView : Array<ITexture> = [];

	/* Input */
	private type : string = 'none';

	/* Output */
	textureChange (_id_texture : string) {
		this.logger.info(`${this.constructor.name}:`, 'textureChange -', '...');
	}

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'texture', 'types']) textureTypes$ : Observable<Map<string, ITextureType>>;
	private textureTypesData : Map<string, ITextureType> = new Map();
	private textureTypes : Array<ITextureType> = [];
	@select(['editor', 'texture', 'loaded']) textureLoad$ : Observable<Map<string, boolean>>;
	private textureLoadData : Map<string, boolean> = new Map();
	@select(['editor', 'texture', 'textures']) textures$ : Observable<Map<string, ITexture>>;
	private textures : Array<ITexture> = [];

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private editorService : EditorService,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.textureLoad$.subscribe((data) => {
			this.textureLoadData = data;
		}));

		this.subscription.push(this.textureTypes$.subscribe((data) => {
			this.textureTypesData = data;
			this.textureTypes = Array.from(data.values());

			if (data.size === 0) {
				this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux -', 'Load texture types...');
				this.editorService.getTextureTypes().subscribe((data) => {
					if (data.types && data.types.length !== 0) {
						this.ngRedux.dispatch(this.editorActions.addTextureTypes(data.types));
					}
				}, (error) => {});
			}
		}));

		this.subscription.push(this.textures$.subscribe((data) => {
			this.textures = Array.from(data.values());

			if (data.size !== 0) {
				this.logger.info(`${this.constructor.name}:`, 'ngOnInit - Redux -', 'Use loaded textures...');
				this.texturesView = this.textures.filter((data) => data.type === this.activeTextureTypeId);
			}
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	onChangeTextureType (event : any) {
		this.logger.info(`${this.constructor.name}:`, 'onChangeTextureType -',
			`${this.activeTextureTypeId} = ${this.textureTypesData.get(this.activeTextureTypeId).name}`);

		if(this.textureLoadData.get(this.activeTextureTypeId)) {
			this.logger.info(`${this.constructor.name}:`, 'onChangeTextureType -', 'Use loaded textures...');
			this.texturesView = this.textures.filter((data) => data.type === this.activeTextureTypeId);
		}
		else {
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
