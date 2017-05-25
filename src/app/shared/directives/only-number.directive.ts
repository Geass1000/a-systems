import { Directive, ElementRef, HostListener } from '@angular/core';

import { LoggerService } from '../../core/logger.service';

@Directive({
	selector : '[asOnlyNumber]'
})
export class OnlyNumberDirective {

	private specialKeys : Array<string> = [ 'Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ];
	private ctrlKeys : Array<string> = [ 'a', 'c', 'v', 'x', 'z' ];

	constructor (private elementRef: ElementRef,
						 	 private logger : LoggerService) {
	}

	/**
	 * onKeyDown - событие, отвечающее за обработку изменния компонентов.
	 *
	 * @kind {event}
	 * @return {type}
	 */
	@HostListener('keydown', ['$event']) onKeyDown (event : KeyboardEvent) {
		if ((this.specialKeys.indexOf(event.key) !== -1) ||
				(event.ctrlKey && this.ctrlKeys.indexOf(event.key.toLowerCase()) !== -1)) {
			return true;
		}

		const str : string = this.elementRef.nativeElement.value + event.key;
		const rgx : RegExp = new RegExp(/^[0-9]+(\.[0-9]*)?$/);
		if (!rgx.test(str)) {
			event.preventDefault();
			return false;
		}
		return true;
	}
}
