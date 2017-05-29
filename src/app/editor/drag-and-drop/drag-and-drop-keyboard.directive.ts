import { Directive, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../../actions/editor.actions';

/* App Services */
import { LoggerService } from '../../core/logger.service';
import { DragAndDropService } from './drag-and-drop.service';

/* App Interfaces and Classes */
import { IElement } from '../../shared/interfaces/editor.interface';

@Directive({
	selector : '[asDragAndDropKeyboard]'
})
export class DragAndDropKeyboardDirective implements OnInit, OnDestroy {
	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'state', 'activeElements']) activeElements$ : Observable<Array<IElement>>;
	private activeElements : Array<IElement>;
	//private activeElements : Array<IElement>;

	constructor (private elementRef: ElementRef,
							 private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private dragAndDropService : DragAndDropService) {
	}
	ngOnInit () {
		this.activeElements = [];
		this.subscription.push(this.activeElements$.subscribe((data) => {
			this.activeElements = data;
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	/**
	 * onKeyDown - событие, отвечающее за определение нажатия кнопок на клавиатуре.
	 *
	 * @kind {event}
	 * @param  {MouseEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('window:keydown', ['$event']) onKeyDown (event : KeyboardEvent) : boolean | void {
		this.logger.info(`${this.constructor.name} - onKeyDown:`, 'Use');
		this.logger.info(`${this.constructor.name} - onKeyDown:`, 'event -', event);
		if ((<Element>event.target).tagName.toLowerCase() !== 'body') {
			return ;
		}
		switch (event.key.toLowerCase()) {
			case 'backspace' :
			case 'delete' : {
				if (!this.activeElements || !this.activeElements.length) {
					return ;
				}
				this.logger.info(`${this.constructor.name} - onKeyDown:`, 'Delete');
				const activeElements : Array<IElement> = this.activeElements;
				this.dragAndDropService.setActiveElements([]);
				this.ngRedux.dispatch(this.editorActions.deleteElement(activeElements));
			}
		}
		this.logger.info(`${this.constructor.name} - onKeyDown:`, 'Complete');
	}
}
