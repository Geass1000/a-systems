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
	private activeTextureType : string = "";

	/* Input */
	private type : string = 'none';

	/* Output */
	@Output('onChanged') onChanged = new EventEmitter<string>();
	textureChange (_id_texture : string) {
		this.onChanged.emit(_id_texture);
	}

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'textureTypes']) textureTypes$ : Observable<Map<string, ITextureType>>;
	private textureTypes : Array<ITextureType> = [];
	@select(['editor', 'textures']) textures$ : Observable<Map<string, ITexture>>;
	private textures : Array<ITexture> = [];

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private editorService : EditorService,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.textureTypes$.subscribe((data) => {
			this.textureTypes = Array.from(data.values());
			if (data.size === 0) {
				this.editorService.getTextureTypes().subscribe((data) => {
					if (data.types.length !== 0) {
						this.ngRedux.dispatch(this.editorActions.addTextureTypes(data.types));
					}
				}, (error) => {});
			}
		}));
		this.subscription.push(this.textures$.subscribe((data) => {
			this.textures = Array.from(data.values());

			if (data.size !== 0) {
				this.logger.info(`${this.constructor.name}:`, `Get: ${this.textures.length} texture; Type: ${this.type}`);
				this.activeTextureId = this.textures[0]._id;
				this.onChanged.emit(this.textures[0]._id);
			}
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	onChangeTextureType (event : any) {
		this.logger.log(this.activeTextureType);
		this.editorService.getTextures(this.activeTextureType).subscribe((data) => {
			if (data.textures.length !== 0) {
				this.ngRedux.dispatch(this.editorActions.addTextures(data.textures));
			}
		}, (error) => {});
	}
}
