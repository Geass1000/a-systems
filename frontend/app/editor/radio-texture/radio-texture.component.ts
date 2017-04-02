import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { EditorService } from '../editor.service';
import { ITexture, ITextureTile } from '../../shared/interfaces/editor.interface';
import { IMap, mapToArray } from '../../shared/interfaces/type.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-radio-texture',
	templateUrl: 'radio-texture.component.html',
  styleUrls: [ 'radio-texture.component.css' ]
})
export class RadioTextureComponent implements OnInit, OnDestroy {
	/* Private variable */
	private state : ITextureTile = null;
	private activeTexture : string = '';
	private offsets : IMap<Array<number>> = {};

	/* Input */
	@Input('width') width : number = 100;
	@Input('type') type : string = 'none';

	/* Output */
	@Output('onChanged') onChanged = new EventEmitter<ITextureTile>();
	textureChange (texture : ITexture, tileID : number) {
		this.state = {
			_id_texture : texture._id,
			_id_tile : tileID
		};
		this.onChanged.emit(this.state);
	}

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'isInit']) isInit$ : Observable<boolean>;
	private isInit : boolean;
	@select(['editor', 'textures']) textures$ : Observable<IMap<ITexture>>;
	private textures : Array<ITexture>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private editorService : EditorService) {
	}
	ngOnInit () {
		this.subscription.push(this.isInit$.subscribe((data) => this.isInit = data));
		this.subscription.push(this.textures$.subscribe((data) => {
			this.textures = mapToArray<ITexture>(data).filter((d) => d.type === this.type);
			if (this.textures.length !== 0) {
				this.textures.map((data) => {
					this.offsets[data._id] = this.createOffset(data);
				});
			}
			if (this.textures.length !== 0 && !this.state) {
				this.activeTexture = '0-0';
				this.state = {
					_id_texture : this.textures[0]._id,
					_id_tile : 0
				};
				this.onChanged.emit(this.state);
			}
		}));

		this.editorService.getTextures(this.type).subscribe((data) => { ; }, (error) => { ; });
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	createOffset (texture : ITexture) {
		let arr : Array<number> = new Array(texture.names.length).fill(0);
		arr = arr.map((data, index) => texture.size * index);
		return arr;
	}

	idTile (id : number, offset : number) {
		return `${id}-${offset}`;
	}
}
