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
	  it('Тест 1: Метод get', () => {
	    assert.property(route, 'get');
			assert.isFunction(route.get);
	  });
		it('Тест 2: Метод post', () => {
	    assert.property(route, 'post');
			assert.isFunction(route.post);
	  });
		it('Тест 3: Метод put', () => {
	    assert.property(route, 'put');
			assert.isFunction(route.put);
	  });
		it('Тест 4: Метод delete', () => {
	    assert.property(route, 'delete');
			assert.isFunction(route.delete);
	  });
	});

	describe('Тестирование метода \'paramParser\'', () => {
		it('Тест 1: Один путь Один controller', () => {
			let obj = {
				path : '/',
				controller: HomeController.index,
				middleware: null
			};
			expect(route.paramParser('/', HomeController.index)).to.eql(obj);
	  });

		it('Тест 2: Один путь Один controller Один middleware', () => {
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

		it('Тест 3: Один путь Один controller Два middleware', () => {
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

		it('Тест 4: Нет контроллера', () => {
			assert.throws( () => { route.paramParser('/') }, Error);
	  });

		it('Тест 5: Нет пути', () => {
			assert.throws( () => { route.paramParser(4) }, Error);
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

		it('Тест 1: Метод get', () => {
			route.get('/', HomeController.index);
			route.get('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.get()).to.eql(arr);
	  });

		it('Тест 2: Метод post', () => {
			route.post('/', HomeController.index);
			route.post('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.post()).to.eql(arr);
	  });

		it('Тест 3: Метод put', () => {
			route.put('/', HomeController.index);
			route.put('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.put()).to.eql(arr);
	  });

		it('Тест 4: Метод delete', () => {
			route.delete('/', HomeController.index);
			route.delete('/', {
				controller: HomeController.index,
				middleware: AuthController.login
			});
			expect(route.delete()).to.eql(arr);
	  });
	});
});
