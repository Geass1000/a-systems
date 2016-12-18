'use strict';
let chai  = require('chai');
let assert = chai.assert;
let expect = chai.expect;

let Route = require('../app/lib/route.class.js');

class HomeController {
	constructor () { ; }
	static index() { ; }
}
class AuthController {
	constructor () { ; }
	static index() { ; }
	static login() { ; }
	static rule() { ; }
}

describe('Class Route', () => {
  let route;

	describe('Тестирование метода \'pathInspection\'', () => {
		beforeEach(() => {
			route = Route.create();
		});

		it('Проверка результата: undefined = false', () => {
			expect(route.pathInspection()).to.eql(false);
		});
		it('Проверка результата: 1 = false', () => {
			expect(route.pathInspection(1)).to.eql(false);
		});
		it('Проверка результата: \'\' = false', () => {
			expect(route.pathInspection('')).to.eql(false);
		});
		it('Проверка результата: \' \' = false', () => {
			expect(route.pathInspection(' ')).to.eql(false);
		});
		it('Проверка результата: \'auth\' = false', () => {
			expect(route.pathInspection('auth')).to.eql(false);
		});
		it('Проверка результата: \'//\' = false', () => {
			expect(route.pathInspection('//')).to.eql(false);
		});
		it('Проверка результата: \'/\' = true', () => {
			expect(route.pathInspection('/')).to.eql(true);
		});
		it('Проверка результата: \'/auth\' = true', () => {
			expect(route.pathInspection('/auth')).to.eql(true);
		});
		it('Проверка результата: \'/auth/\' = true', () => {
			expect(route.pathInspection('/auth/')).to.eql(true);
		});
	});

	describe('Тестирование метода \'pathCorrection\'', () => {
		beforeEach(() => {
			route = Route.create();
		});

		it('Проверка результата: /auth/ = /auth', () => {
			expect(route.pathCorrection('/auth/')).to.eql('/auth');
		});
		it('Проверка результата: /auth = /auth', () => {
			expect(route.pathCorrection('/auth')).to.eql('/auth');
		});
		it('Проверка результата: / = /', () => {
			expect(route.pathCorrection('/')).to.eql('/');
		});
	});

	describe('Тестирование метода \'pathCombine\'', () => {
		beforeEach(() => {
			route = Route.create();
		});

		it('Проверка результата: / + / = /', () => {
			expect(route.pathCombine('/', '/')).to.eql('/');
		});
		it('Проверка результата: / + /auth = /auth', () => {
			expect(route.pathCombine('/', '/auth')).to.eql('/auth');
		});
		it('Проверка результата: /auth + / = /auth', () => {
			expect(route.pathCombine('/auth', '/')).to.eql('/auth');
		});
		it('Проверка результата: /auth + /auth = /auth', () => {
			expect(route.pathCombine('/auth', '/auth')).to.eql('/auth/auth');
		});
	});

	describe('Тестирование метода \'paramParser\'', () => {
		beforeEach(() => {
			route = Route.create();
		});

		it('Проверка первого параметра: Путь', () => {
			assert.doesNotThrow( () => { route.paramParser('/', HomeController.index); }, Error);
			assert.doesNotThrow( () => { route.paramParser('/home', HomeController.index); }, Error);
			assert.doesNotThrow( () => { route.paramParser('/home/', HomeController.index); }, Error);
			assert.throws( () => { route.paramParser(4, HomeController.index); }, Error);
			assert.throws( () => { route.paramParser('', HomeController.index); }, Error);
		});

		it('Проверка второго параметра: controller/middleware', () => {
			assert.throws( () => { route.paramParser('/'); }, Error);
			assert.throws( () => { route.paramParser('/', 4); }, Error);
			assert.throws( () => { route.paramParser('/', 'Home'); }, Error);
		});

		it('Проверка результата: path + controller', () => {
			let obj = {
				path : '/',
				controller: HomeController.index,
				middleware: null
			};
			expect(route.paramParser('/', HomeController.index)).to.eql(obj);
		});

		it('Проверка результата: path + controller + middleware', () => {
			let obj = {
				path : '/',
				controller: HomeController.index,
				middleware: AuthController.login
			};
			expect(route.paramParser('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			})).to.eql(obj);
		});

		it('Проверка результата: path + controller + (2 x middleware)', () => {
			let obj = {
				path : '/',
				controller: HomeController.index,
				middleware: [AuthController.login, AuthController.rule]
			};
			expect(route.paramParser('/', {
				controller: HomeController.index,
				middleware: [AuthController.login, AuthController.rule]
			})).to.eql(obj);
		});
	});

	describe('Проверка маршрутных методов на доступность', () => {
		beforeEach(() => {
			route = Route.create();
		});

		it('Метод get', () => {
			assert.property(route, 'get');
			assert.isFunction(route.get);
		});
		it('Метод post', () => {
			assert.property(route, 'post');
			assert.isFunction(route.post);
		});
		it('Метод put', () => {
			assert.property(route, 'put');
			assert.isFunction(route.put);
		});
		it('Метод delete', () => {
			assert.property(route, 'delete');
			assert.isFunction(route.delete);
		});
	});

	describe('Тестирование мрашрутных методов', () => {
		let res;

		before(() => {
			res = [{
					path : '/',
					controller: HomeController.index,
					middleware: null
				},
				{
					path : '/',
					controller: HomeController.index,
					middleware: AuthController.login
				}
			];
		});

		beforeEach(() => {
			route = Route.create();
		});

		it('Метод get', () => {
			route.get('/', HomeController.index);
			route.get('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.get()).to.eql(res);
		});

		it('Метод post', () => {
			route.post('/', HomeController.index);
			route.post('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.post()).to.eql(res);
		});

		it('Метод put', () => {
			route.put('/', HomeController.index);
			route.put('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.put()).to.eql(res);
		});

		it('Метод delete', () => {
			route.delete('/', HomeController.index);
			route.delete('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.delete()).to.eql(res);
		});
	});

	describe('Тестирование метода \'use\'', () => {
		let useRoute;
		let res;

		beforeEach(() => {
			route = Route.create();
			useRoute = Route.create();
		});

		it('Проверка первого параметра: Путь', () => {
			useRoute.post('/home', HomeController.index);
			assert.doesNotThrow( () => { route.use('/', useRoute); }, Error);
			assert.doesNotThrow( () => { route.use('/auth', useRoute); }, Error);
			assert.doesNotThrow( () => { route.use('/auth/', useRoute); }, Error);
			assert.throws( () => { route.use('', useRoute); }, Error);
			assert.throws( () => { route.use(1, useRoute); }, Error);
		});

		it('Проверка второго параметра: Объект-роутер', () => {
			useRoute.post('/home', HomeController.index);
			assert.doesNotThrow( () => { route.use('/', useRoute); }, Error);
			assert.throws( () => { route.use('/', 1); }, Error);
			assert.throws( () => { route.use('/'); }, Error);
		});

		it('Проверка результата: / + / = /', () => {
			useRoute.post('/', HomeController.index);
			res = [{
					path : '/',
					controller: HomeController.index,
					middleware: null
				}
			];
			route.use('/', useRoute);
			expect(route.post()).to.eql(res);
		});

		it('Проверка результата: / + /home = /home', () => {
			useRoute.post('/home', HomeController.index);
			res = [{
					path : '/home',
					controller: HomeController.index,
					middleware: null
				}
			];
			route.use('/', useRoute);
			expect(route.post()).to.eql(res);
		});

		it('Проверка результата: /home + / = /home', () => {
			useRoute.post('/', HomeController.index);
			res = [{
					path : '/home',
					controller: HomeController.index,
					middleware: null
				}
			];
			route.use('/home', useRoute);
			expect(route.post()).to.eql(res);
		});

		it('Проверка результата: /home + /home = /home/home', () => {
			useRoute.post('/home', HomeController.index);
			res = [{
					path : '/home/home',
					controller: HomeController.index,
					middleware: null
				}
			];
			route.use('/home', useRoute);
			expect(route.post()).to.eql(res);
		});

		it('Проверка результата: Несколько путей', () => {
			useRoute.post('/home', HomeController.index);
			useRoute.post('/login', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			res = [{
					path : '/home/auth/home',
					controller: HomeController.index,
					middleware: null
				},
				{
					path : '/home/auth/login',
					controller: HomeController.index,
					middleware: AuthController.login
				}
			];
			route.use('/auth', useRoute);
			route.use('/home', route);
			expect(route.post()).to.eql(res);
		});
	});
});
