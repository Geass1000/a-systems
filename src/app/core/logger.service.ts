import { Injectable, Optional } from '@angular/core';

export enum Level {
	OFF = 0,
	ERROR = 1,
	WARN = 2,
	INFO = 3,
	DEBUG = 4,
	LOG = 5
};

export class Options {
	level : Level;
}

const DEFAULT_OPTIONS : Options = {
	level : Level.INFO
};

@Injectable()
export class LoggerService {
	private level : Level = Level.LOG;
	private availableLevel : string[] = ['error', 'warn', 'info', 'debug', 'log'];

	constructor (@Optional() options ?: Options) {
		const opts : Options = <Options>Object.assign({}, DEFAULT_OPTIONS, options);
		this.level = opts.level;
	}

	/**
	 * Переопределения console.error.
	 *
	 * @method
	 *
	 * @param {Array<any>} restOfMessage - выводимые сообщения
	 * @return {void}
	 */
	error (...restOfMessage : Array<any>) : void {
		if (this.isEnable(Level.ERROR)) {
			console.error.apply(console, restOfMessage);
		}
	}

	/**
	 * Переопределения console.warn.
	 *
	 * @method
	 *
	 * @param {Array<any>} restOfMessage - выводимые сообщения
	 * @return {void}
	 */
	warn (...restOfMessage : Array<any>) : void {
		if (this.isEnable(Level.WARN)) {
			console.warn.apply(console, restOfMessage);
		}
	}

	/**
	 * Переопределения console.info.
	 *
	 * @method
	 *
	 * @param {Array<any>} restOfMessage - выводимые сообщения
	 * @return {void}
	 */
	info (...restOfMessage : Array<any>) : void {
		if (this.isEnable(Level.INFO)) {
			console.info.apply(console, restOfMessage);
		}
	}

	/**
	 * Переопределения console.debug.
	 *
	 * @method
	 *
	 * @param {Array<any>} restOfMessage - выводимые сообщения
	 * @return {void}
	 */
	debug (...restOfMessage : Array<any>) : void {
		if (this.isEnable(Level.DEBUG)) {
			(console.debug || console.log).apply(console, restOfMessage);
		}
	}

	/**
	 * Переопределения console.log.
	 *
	 * @method
	 *
	 * @param {Array<any>} restOfMessage - выводимые сообщения
	 * @return {void}
	 */
	log (...restOfMessage : Array<any>) : void {
		if (this.isEnable(Level.LOG)) {
			console.log.apply(console, restOfMessage);
		}
	}

	/**
	 * Переопределение console.print.
	 *
	 * @method
	 *
	 * @param {string} logLevel - название уровня логгирования
	 * @param {Array<any>} restOfMessage - выводимые сообщения
	 * @return {void}
	 */
	print (logLevel : string, ...restOfMessage : Array<any>) : void {
		if (this.availableLevel.indexOf(logLevel) === -1) {
			throw new Error('Level not exist');
		}
		this[logLevel].apply(this, restOfMessage);
	}

	/**
	 * isEnable - выполняет проверку текущего уровня логгирования.
	 *
	 * @method
	 *
	 * @param {Level} level - уровень метода
	 * @return {boolean}
	 */
	private isEnable (level : Level) : boolean {
		return this.level >= level;
	}

}
