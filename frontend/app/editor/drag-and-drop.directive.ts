import { Directive, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';

/* App Redux and Request */
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { EditorActions } from '../actions/editor.actions';

/* App Services */
import { LoggerService } from '../core/logger.service';

/* App Interfaces and Classes */
import { IElement } from '../shared/interfaces/editor.interface';

@Directive({
	selector : '[drag-and-drop]'
})
export class DragAndDropDirective implements OnInit, OnDestroy {
	private startX : number;					// Начальная координата нажатия по оси X
	private startY : number;					// Начальная координата нажатия по оси Y
	private shiftX : number;					// Сдвиг по оси X относительно предыдущего значения мыши
	private shiftY : number;					// Сдвиг по оси Y относительно предыдущего значения мыши

	private precision : number = 3;		// Размер мёртвой зоны (ширина и высота)

	private isDown : boolean;					// Нажата ли левая кнопка мыши над областью?
	private isMove : boolean;					// Было ли движение мыши (с учётом мёртвой зоны)?

	//private element : IElement = null;
	private activeElements : Array<IElement>;
	private targetElements : Array<IElement>;

	private nameTranslateMethod : string;
	private argsTranslateMethod : Array<number>;

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['editor', 'state', 'activeElements']) activeElements$ : Observable<Array<IElement>>;
	//private activeElements : Array<IElement>;

	constructor (private elementRef: ElementRef,
							 private ngRedux : NgRedux<any>,
							 private editorActions : EditorActions,
						 	 private logger : LoggerService) {
	}
	ngOnInit () {
		this.initData();
		this.targetElements = [];
		this.activeElements = [];
		this.subscription.push(this.activeElements$.subscribe((data) => {
			this.activeElements = data;
		}));
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}

	initData () {
		this.isDown = false;
		this.isMove = false;
		this.ngRedux.dispatch(this.editorActions.toggleMove(false));
	}


	/**
	 * detectLeftButton - функция, отвечающая за определение нажатия левой кнопки мыши.
	 *
	 * @function
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
	 * setActiveElements - установка активно элемента в виде элемента els.
	 *
	 * @function
	 * @param {Array<IElement>} els
	 * @return {void}
	 */
	setActiveElements (els : Array<IElement>) : void {
		this.ngRedux.dispatch(this.editorActions.setActiveElements(els));
	}

	/**
	 * captureElement - поиск элементов с классом 'draggable'. Найденые элементы
	 * заносятся в массив в виде структур IElement.
	 *
	 * @function
	 * @param  {SVGElement} element : SVGElement
	 * @return {Array<IElement>}
	 */
	captureElement (element : SVGElement) : Array<IElement> {
		let activeElements : Array<IElement> = [];
		let el : any = element;
		while (el = el.closest('.draggable')) {
			activeElements.push({
				type : el.getAttribute('data-type'),
				id : +el.getAttribute('data-id'),
				capture : !el.hasAttribute('data-no-capture')
			});
			el = el.parentElement;
		}
		return activeElements.reverse();
	}

	/**
	 * createDraggableArray - создание массива с переносимыми элементами и установка
	 * активного элемента если переносимый объект не требует выделения.
	 *
	 * @function
	 * @return {Array<IElement>}
	 */
	createDraggableArray () : Array<IElement> {
		if (!this.activeElements || !this.targetElements) {
			return [];
		}
		let result : Array<IElement> = [];
		for (let i = 0; i < this.activeElements.length; i++) {
			if (!this.activeElements[i] || !this.targetElements[i]) {
				break;
			}
			if (this.activeElements[i].type === this.targetElements[i].type &&
					this.activeElements[i].id === this.targetElements[i].id) {
				result.push(this.activeElements[i]);
			} else {
				break;
			}
		}
		let correctResult : Array<IElement> = this.correctTarget(result);
		if (result.length !== correctResult.length) {
			result = correctResult;
			this.setActiveElements(result);
		}
		return result;
	}


	/**
	 * correctTarget - функция дополняет массив els значениями из массива targetElements
	 * у которых значение capture = false.
	 *
	 * @function
	 * @param {Array<IElement>} els
	 * @return {Array<IElement>}
	 */
	correctTarget (els : Array<IElement>) : Array<IElement> {
		if (!els || els.length === this.targetElements.length) {
			return this.targetElements;
		}
		let result : Array<IElement> = [...els];
		for (let i = els.length; i < this.targetElements.length; i++) {
			if (!this.targetElements[i].capture) {
				result.push(this.targetElements[i]);
			} else {
				break;
			}
		}
		return result;
	}

	/**
	 * createNameTranslateMethod - генерация названия метода перенесоа.
	 *
	 * @function
	 * @param {Array<IElement>} els : Array<IElement>
	 * @return {String}
	 */
	createNameTranslateMethod (els : Array<IElement>) : string {
		if (!els || !els.length) {
			return 'translateWorkspace';
		}
		let result : string = els.reduce((prev, cur) => {
			return prev + this.capitalizeFirstLetter(cur.type);
		}, 'translate');
		return result;
	}

	/**
	 * createArgsTranslateMethod - генерация массива аргументов для метода пенреноса.
	 *
	 * @function
	 * @param {Array<IElement>} els
	 * @return {Array<number>}
	 */
	createArgsTranslateMethod (els : Array<IElement>) : Array<number> {
		if (!els || !els.length) {
			return [];
		}
		let result : Array<number> = els.reduce((prev, cur) => {
			return [...prev, cur.id];
		}, []);
		return result;
	}

	/**
	 * capitalizeFirstLetter - преобразование первой буквы в заглавную.
	 *
	 * @function
	 * @param {string} str : исходная строка
	 * @return {string}
	 */
	capitalizeFirstLetter (str : string) : string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	/**
	 * onMouseDown - событие, отвечающее за обработка нажатия кнопки мыши.
	 *
	 * @kind {event}
	 * @param {MouseEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('mousedown', ['$event']) onMouseDown (event : MouseEvent) : boolean | void {
		if (!this.detectLeftButton(event)) {
			return false;
		}

		this.initData();

		this.targetElements = this.captureElement(<SVGElement>event.target);
		this.logger.info(`${this.constructor.name} - onMouseDown:`, 'targetElements -', this.targetElements);
		this.logger.info(`${this.constructor.name} - onMouseDown:`, 'activeElements -', this.activeElements);

		let compare : Array<IElement> = this.createDraggableArray();
		this.nameTranslateMethod = this.createNameTranslateMethod(compare);
		if (!this.editorActions[this.nameTranslateMethod]) {
			this.logger.warn(`${this.constructor.name} - onMouseDown:`, 'Method isn\'t exist -', this.nameTranslateMethod);
			return false;
		}
		this.argsTranslateMethod = this.createArgsTranslateMethod(compare);
		this.logger.info(`${this.constructor.name} - onMouseDown:`, 'nameTranslateMethod -', this.nameTranslateMethod);
		this.logger.info(`${this.constructor.name} - onMouseDown:`, 'argsTranslateMethod -', this.argsTranslateMethod);

		this.startX = event.clientX;
		this.startY = event.clientY;
		this.shiftX = this.startX;
		this.shiftY = this.startY;
		this.isDown = true;

		event.preventDefault();
		return false;
	}

	/**
	 * onMouseMove - событие, отвечающее за обработка перемещения мыши в области переноса.
	 *
	 * @kind {event}
	 * @param {MouseEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('mousemove', ['$event']) onMouseMove (event : MouseEvent) : boolean | void {
		if (!this.isDown) {
			return false;
		}
		if (!this.isMove) {
			if (Math.abs(event.clientX - this.startX) < this.precision &&
					Math.abs(event.clientY - this.startY) < this.precision) {
				return false;
			}
			this.ngRedux.dispatch(this.editorActions.toggleMove(true));
			this.isMove = true;
		}

		let dX = event.clientX - this.shiftX;
		let dY = event.clientY - this.shiftY;
		this.shiftX = event.clientX;
		this.shiftY = event.clientY;

		let action = this.editorActions[this.nameTranslateMethod]([dX, dY, ...this.argsTranslateMethod]);
		this.ngRedux.dispatch(action);
		event.preventDefault();
	}

	/**
	 * onMouseUp - событие, отвечающее за отжатие кнопки мыши.
	 *
	 * @kind {event}
	 * @param {MouseEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('mouseup', ['$event']) onMouseUp (event : MouseEvent) : boolean | void {
		if (!this.isDown) {
			return false;
		}
		if (!this.isMove) {
			this.setActiveElements(this.targetElements);
		}
		this.logger.info(`${this.constructor.name} - onMouseUp:`, 'isMove -', this.isMove);
		this.initData();
		event.preventDefault();
	}

	/**
	 * onMouseUp - событие, отвечающее за выход курсора за пределы области переноса.
	 *
	 * @kind {event}
	 * @param {MouseEvent} event
	 * @return {boolean|void}
	 */
	@HostListener('mouseleave', ['$event']) onMouseLeave (event : MouseEvent) : boolean | void {
		this.logger.info(`${this.constructor.name} - onMouseLeave:`, 'Use');
		this.initData();
		return true;
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
				let activeElements : Array<IElement> = this.activeElements;
				this.setActiveElements([]);
				this.ngRedux.dispatch(this.editorActions.deleteElement(activeElements));
			}
		}
		this.logger.info(`${this.constructor.name} - onKeyDown:`, 'Complete');
	}
}
