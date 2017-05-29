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
import { IEElement } from '../../shared/interfaces/editor.interface';

@Directive({
	selector : '[asDragAndDropMouse]'
})
export class DragAndDropMouseDirective implements OnInit, OnDestroy {
	/* Redux */
	private subscription : Array<Subscription> = [];

	constructor (private elementRef: ElementRef,
							 private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService,
						 	 private dragAndDropService : DragAndDropService) {
	}
	ngOnInit () {
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}


	/**
	 * detectLeftButton - функция, отвечающая за определение нажатия левой кнопки мыши.
	 *
	 * @method
	 *
	 * @param {MouseEvent} event
	 * @return {boolean}
	 */
	detectLeftButton (event : MouseEvent) : boolean {
		if ('buttons' in event) {
			return event.buttons === 1;
		}
		return (event.which || event.button) === 1;
	}

	/**
	 * onMouseDown - отвечает за обработку события начала переноса для мышки.
	 *
	 * @method
	 *
	 * @param {MouseEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('mousedown', ['$event']) onMouseDown (event : MouseEvent) : boolean | void {
		if (!this.detectLeftButton(event)) {
			return false;
		}

		const eventElement : IEElement = {
			target : event.target,
			clientX : event.clientX,
			clientY : event.clientY
		};

		this.dragAndDropService.onElementDown(eventElement);
		event.preventDefault();
		return false;
	}

	/**
	 * onMouseMove - отвечает за обработку события переноса для мышки.
	 *
	 * @method
	 *
	 * @param {MouseEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('mousemove', ['$event']) onMouseMove (event : MouseEvent) : boolean | void {
		const eventElement : IEElement = {
			target : event.target,
			clientX : event.clientX,
			clientY : event.clientY
		};

		this.dragAndDropService.onElementMove(eventElement);
		event.preventDefault();
		return false;
	}

	/**
	 * onMouseUp - отвечает за обработку события остановки переноса для мышки.
	 *
	 * @method
	 *
	 * @param {MouseEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('mouseup', ['$event']) onMouseUp (event : MouseEvent) : boolean | void {
		const eventElement : IEElement = {
			target : event.target,
			clientX : event.clientX,
			clientY : event.clientY
		};

		this.dragAndDropService.onElementUp(eventElement);
		event.preventDefault();
		return false;
	}

	/**
	 * onMouseUp - событие, отвечающее за выход курсора за пределы области переноса.
	 *
	 * @method
	 *
	 * @param {MouseEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('mouseleave', ['$event']) onMouseLeave (event : MouseEvent) : boolean | void {
		this.logger.info(`${this.constructor.name} - onMouseLeave:`, 'Use');
		this.dragAndDropService.initData();
		return true;
	}
}
