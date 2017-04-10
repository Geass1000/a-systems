import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { EditorService } from '../editor.service';
import { LoggerService } from '../../core/logger.service';
import { ITexture } from '../../shared/interfaces/editor.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-radio-texture',
	templateUrl: 'radio-texture.component.html',
  styleUrls: [ 'radio-texture.component.css' ]
})
export class RadioTextureComponent implements OnInit, OnDestroy {
	/* Private variable */
	private activeTextureId : string = null;

	/* Input */
	@Input('type') type : string = 'none';

	/* Output */
	@Output('onChanged') onChanged = new EventEmitter<string>();
	textureChange (_id_texture : string) {
		this.onChanged.emit(_id_texture);
	}

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'textures']) textures$ : Observable<Map<string, ITexture>>;
	private textures : Array<ITexture> = [];

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private editorService : EditorService,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.subscription.push(this.textures$.subscribe((data) => {
			this.textures = Array.from(data.values()).filter((d) => d.type === this.type);

			if (this.textures.length !== 0) {
				this.logger.info(`${this.constructor.name}:`, `Get: ${this.textures.length} texture; Type: ${this.type}`);
				this.activeTextureId = this.textures[0]._id;
				this.onChanged.emit(this.textures[0]._id);
			}
			else {
				this.editorService.getTextures(this.type).subscribe((data) => {}, (error) => {});
			}
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
}
