import { Injectable } from '@angular/core';

import { Config } from '../config';

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
	constructor () {
	}

	error (...restOfMessage : string[]) {
		this.isEnable(Level.ERROR) && console.error.apply(console, restOfMessage);
	}
	warn (...restOfMessage : string[]) {
		this.isEnable(Level.WARN) && console.warn.apply(console, restOfMessage);
	}
	info (...restOfMessage : string[]) {
		this.isEnable(Level.INFO) && console.info.apply(console, restOfMessage);
	}
	debug (...restOfMessage : string[]) {
		this.isEnable(Level.DEBUG) && (console.debug || console.log).apply(console, restOfMessage);
	}
	log (...restOfMessage : string[]) {
		this.isEnable(Level.LOG) && console.log.apply(console, restOfMessage);
	}
	print (logLevel : string, ...restOfMessage : string[]) {
		if (!this[logLevel]) throw 'Level not exist';
		this[logLevel].apply(this, restOfMessage);
	}

	private isEnable (level : Level) {
		return this.level >= level;
	}

}
