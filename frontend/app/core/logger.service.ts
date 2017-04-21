import { Injectable } from '@angular/core';

enum Level {
	OFF = 0,
	ERROR = 1,
	WARN = 2,
	INFO = 3,
	DEBUG = 4,
	LOG = 5
};

@Injectable()
export class LoggerService {
	private level : Level = Level.LOG;
	private availableLevel : string[] = ['error', 'warn', 'info', 'debug', 'log'];
	constructor () {
	}

	error (...restOfMessage : any[]) {
		if (this.isEnable(Level.ERROR)) {
			console.error.apply(console, restOfMessage);
		}
	}
	warn (...restOfMessage : any[]) {
		if (this.isEnable(Level.WARN)) {
			console.warn.apply(console, restOfMessage);
		}
	}
	info (...restOfMessage : any[]) {
		if (this.isEnable(Level.INFO)) {
			console.info.apply(console, restOfMessage);
		}
	}
	debug (...restOfMessage : any[]) {
		if (this.isEnable(Level.DEBUG)) {
			(console.debug || console.log).apply(console, restOfMessage);
		}
	}
	log (...restOfMessage : any[]) {
		if (this.isEnable(Level.LOG)) {
			console.log.apply(console, restOfMessage);
		}
	}
	print (logLevel : string, ...restOfMessage : any[]) {
		if (this.availableLevel.indexOf(logLevel) === -1) {
			throw 'Level not exist';
		}
		this[logLevel].apply(this, restOfMessage);
	}

	private isEnable (level : Level) {
		return this.level >= level;
	}

}
