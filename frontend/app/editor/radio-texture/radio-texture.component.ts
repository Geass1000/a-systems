import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

import { EditorService } from '../editor.service';
import { IWorkspace, ITexture } from '../../shared/interfaces/editor.interface';
import { IMap, mapToArray } from '../../shared/interfaces/type.interface';

@Component({
	moduleId: module.id,
  selector: 'as-editor-radio-texture',
	templateUrl: 'radio-texture.component.html',
  styleUrls: [ 'radio-texture.component.css' ]
})
export class RadioTextureComponent implements OnInit, OnDestroy {
	title = 'Home';
	private activTexture : string;
	@Input('width') width : number = 100;
	@Input('type') type : string = 'none';

	/* Redux */
	private subscription : any[] = [];
	@select(['editor', 'isInit']) isInit$ : Observable<boolean>;
	private isInit : boolean;
	@select(['editor', 'textures']) textures$ : Observable<IMap<ITexture>>;
	private textures : Array<ITexture>;

	constructor (private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private editorService : EditorService,
						 	 private sanitizer: DomSanitizer) {
	}
	ngOnInit () {
		this.subscription.push(this.isInit$.subscribe((data) => this.isInit = data));
		this.subscription.push(this.textures$.subscribe((data) => {
			this.textures = mapToArray<ITexture>(data).filter((d) => d.type === this.type);
			console.log(this.textures);
		}));

		this.editorService.getTextures(this.type).subscribe(
			(data) => { ; },
			(error) => { ; });
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	createOffset (texture : ITexture) {
		let arr : Array<number> = new Array(texture.amount).fill(0);
		arr = arr.map((data, index) => texture.size * index);
		return arr;
	}

	idTexture (id : number, offset : number) {
		return `${id}-${offset}`;
	}
}
