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
	selector : '[asDragAndDropTouch]'
})
export class DragAndDropTouchDirective implements OnInit, OnDestroy {
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
	 * onTouchStart - отвечает за обработку события начала переноса для тачпада.
	 *
	 * @method
	 *
	 * @param {TouchEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('touchstart', ['$event']) onTouchStart (event : TouchEvent) : boolean | void {
		if (!event.touches.length) {
			event.preventDefault();
			return false;
		}

		const eventElement : IEElement = {
			target : event.touches[0].target,
			clientX : event.touches[0].clientX,
			clientY : event.touches[0].clientY
		};

		this.dragAndDropService.onElementDown(eventElement);
		event.preventDefault();
		return false;
	}

	/**
	 * onTouchMove - отвечает за обработку события переноса для тачпада.
	 *
	 * @method
	 *
	 * @param {TouchEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('touchmove', ['$event']) onTouchMove (event : TouchEvent) : boolean | void {
		if (!event.touches.length) {
			event.preventDefault();
			return false;
		}

		const eventElement : IEElement = {
			target : event.touches[0].target,
			clientX : event.touches[0].clientX,
			clientY : event.touches[0].clientY
		};

		this.dragAndDropService.onElementMove(eventElement);
		event.preventDefault();
		return false;
	}

		/**
	 * onTouchEnd - отвечает за обработку события остановки переноса для тачпада.
	 *
	 * @method
	 *
	 * @param {TouchEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('touchend', ['$event']) onTouchEnd (event : TouchEvent) : boolean | void {
		if (!event.changedTouches.length) {
			event.preventDefault();
			return false;
		}

		const eventElement : IEElement = {
			target : event.changedTouches[0].target,
			clientX : event.changedTouches[0].clientX,
			clientY : event.changedTouches[0].clientY
		};

		this.dragAndDropService.onElementUp(eventElement);
		event.preventDefault();
		return false;
	}

	@HostListener('touchcancel', ['$event']) onTouchCancel (event : TouchEvent) : boolean | void {
		if (!event.changedTouches.length) {
			event.preventDefault();
			return false;
		}

		const eventElement : IEElement = {
			target : event.changedTouches[0].target,
			clientX : event.changedTouches[0].clientX,
			clientY : event.changedTouches[0].clientY
		};

		this.dragAndDropService.onElementUp(eventElement);
		event.preventDefault();
		return false;
	}
}
