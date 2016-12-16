'use strict';
let chai  = require('chai');
let assert = chai.assert;
let expect = chai.expect;

let Route = require('../app/route.class.js');

class HomeController {
	constructor () { ; }
	static index() { ; }
}
class AuthController {
	constructor () { ; }
	static login() { ; }
	static rule() { ; }
}

describe('Class Route', () => {
  let route;

	before(() => {
    route = Route.create();
  });

	describe('Проверка на наличие методов', () => {
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

	describe('Тестирование метода \'paramParser\'', () => {
		it('Один путь Один controller', () => {
			let obj = {
				path : '/',
				controller: HomeController.index,
				middleware: null
			};
			expect(route.paramParser('/', HomeController.index)).to.eql(obj);
	  });

		it('Один путь Один controller Один middleware', () => {
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

		it('Один путь Один controller Два middleware', () => {
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

		it('Нет контроллера', () => {
			assert.throws( () => { route.paramParser('/'); }, Error);
	  });

		it('Нет пути', () => {
			assert.throws( () => { route.paramParser(4); }, Error);
	  });
	});

	describe('Тестирование мрашрутных методов', () => {
		let arr;

		before(() => {
			arr = [{
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
			expect(route.get()).to.eql(arr);
	  });

		it('Метод post', () => {
			route.post('/', HomeController.index);
			route.post('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.post()).to.eql(arr);
	  });

		it('Метод put', () => {
			route.put('/', HomeController.index);
			route.put('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.put()).to.eql(arr);
	  });

		it('Метод delete', () => {
			route.delete('/', HomeController.index);
			route.delete('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.delete()).to.eql(arr);
	  });
	});

	describe('Тестирование метода \'use\'', () => {
		let useRoute;
		let arr;

		beforeEach(() => {
			route = Route.create();
			useRoute = Route.create();
			useRoute.post('/home', HomeController.index);
			useRoute.post('/login', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
		});

		it('Проверка первого параметра: Путь', () => {
			assert.doesNotThrow( () => { route.use('/', useRoute); }, Error);
			assert.doesNotThrow( () => { route.use('/auth', useRoute); }, Error);
			assert.doesNotThrow( () => { route.use('/auth/', useRoute); }, Error);
			assert.throws( () => { route.use('', useRoute); }, Error);
			assert.throws( () => { route.use(1, useRoute); }, Error);
	  });

		it('Проверка второго параметра: Объект-роутер', () => {
			assert.doesNotThrow( () => { route.use('/', useRoute); }, Error);
			assert.throws( () => { route.use('/', 1); }, Error);
			assert.throws( () => { route.use('/'); }, Error);
	  });

		it('Проверка результата: Добавление не пустого пути', () => {
			arr = [{
					path : '/auth/home',
					controller: HomeController.index,
					middleware: null
				},
				{
					path : '/auth/login',
					controller: HomeController.index,
					middleware: AuthController.login
				}
			];
			route.use('/auth', useRoute);
			expect(route.post()).to.eql(arr);
		});

		it('Проверка результата: Добавление пустого пути', () => {
			arr = [{
					path : '/home',
					controller: HomeController.index,
					middleware: null
				},
				{
					path : '/login',
					controller: HomeController.index,
					middleware: AuthController.login
				}
			];
			route.use('/', useRoute);
			expect(route.post()).to.eql(arr);
		});

		it('Проверка результата: Несколько путей', () => {
			arr = [{
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
			expect(route.post()).to.eql(arr);
		});
	});
});
