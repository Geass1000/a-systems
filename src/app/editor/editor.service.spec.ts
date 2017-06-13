import { async, inject, TestBed} from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { IRItem, IRItemCategory, IRTexture, IRTextureCategory } from '../shared/interfaces/editor.interface';
import { EditorService } from './editor.service';
import { LoggerService } from '../core/logger.service';
import { HttpService } from '../core/http.service';

function makeItemCategoriesData () : IRItemCategory {
	return {
		categories : [
			{ _id : '0', _pid : null, name : 'C1' },
			{ _id : '1', _pid : '0', name : 'C2' },
			{ _id : '2', _pid : '0', name : 'C3' },
			{ _id : '3', _pid : '1', name : 'C4' },
			{ _id : '4', _pid : '2', name : 'C5' },
		]
	};
}
function makeTextureCategoriesData () : IRTextureCategory {
	return {
		categories : [
			{ _id : '0', name : 'C1' },
			{ _id : '1', name : 'C2' },
			{ _id : '2', name : 'C3' }
		]
	};
}
function makeTexturesData () : IRTexture {
	return {
		textures : [
			{ _id : '0', _cid : '0', url : './i1.png', width : 100, height : 100 },
			{ _id : '1', _cid : '1', url : './i2.png', width : 200, height : 30 },
			{ _id : '2', _cid : '2', url : './i3.png', width : 150, height : 80 },
			{ _id : '3', _cid : '2', url : './i4.png', width : 120, height : 70 }
		]
	};
}
function makeItemsData () : IRItem {
	return {
		items : [
			{ _id : '0', _cid : '0', preview : './p1.png', type : 'thing', payload : null },
			{ _id : '1', _cid : '1', preview : './p2.png', type : 'surface', payload : null }
		]
	};
}

describe('EditorService (mockBackend)', () => {
	beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports : [ HttpModule ],
      providers : [
        EditorService,
				LoggerService,
				HttpService,
        { provide : XHRBackend, useClass : MockBackend }
      ]
    })
    .compileComponents();
  }));

	it('can instantiate LoggerService when inject service',
    inject([LoggerService], (service : LoggerService) => {
      expect(service instanceof LoggerService).toBe(true);
  }));

	it('can instantiate HttpService when inject service',
    inject([HttpService], (service : HttpService) => {
      expect(service instanceof HttpService).toBe(true);
  }));

	it('can instantiate EditorService when inject service',
    inject([EditorService], (service : EditorService) => {
      expect(service instanceof EditorService).toBe(true);
  }));

	it('can instantiate service with "new"', inject([Http], (http : Http) => {
    expect(http).not.toBeNull('http should be provided');
    const loggerService : LoggerService = new LoggerService();
		const httpService : HttpService = new HttpService(loggerService);
		const editorService : EditorService = new EditorService(http, loggerService, httpService);
    expect(loggerService instanceof LoggerService).toBe(true, 'new loggerService should be ok');
		expect(httpService instanceof HttpService).toBe(true, 'new httpService should be ok');
		expect(editorService instanceof EditorService).toBe(true, 'new editorService should be ok');
  }));

	it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend : MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
  }));

	describe('when check verb method', () => {
		let backend : MockBackend;
		let loggerService : LoggerService;
		let httpService : HttpService;
		let editorService : EditorService;

		beforeEach(inject([Http, XHRBackend], (http : Http, be : MockBackend) => {
			backend = be;
			loggerService = new LoggerService();
			httpService = new HttpService(loggerService);
			editorService = new EditorService(http, loggerService, httpService);
		}));

		it('getTextureCategories: should have expected fake texture categories', async(inject([], () => {
			const fakeData : IRTextureCategory = makeTextureCategoriesData();
			const resp = new Response(new ResponseOptions({ status : 200, body : fakeData }));
			backend.connections.subscribe((c : MockConnection) => c.mockRespond(resp));

			editorService.getTextureCategories().subscribe(
				(data : IRTextureCategory) => {
					expect(data.categories.length).toBe(fakeData.categories.length, 'should have expected no. of texture categories');
				}
			);
		})));

		it('getTextureCategories: should be 404 returning no texture categories', async(inject([], () => {
			const resp = new Response(new ResponseOptions({ status : 404, body : { error : 'No content in database' } }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			editorService.getTextureCategories().subscribe(
				(data : IRTextureCategory) => { },
				(error : string) => {
					expect(error).toBe('No content in database', 'should have no texture categories');
				}
			);
		})));

		it('getItemCategories: should have expected fake item categories', async(inject([], () => {
			const fakeData : IRItemCategory = makeItemCategoriesData();
			const resp = new Response(new ResponseOptions({ status : 200, body : fakeData }));
			backend.connections.subscribe((c : MockConnection) => c.mockRespond(resp));

			editorService.getItemCategories().subscribe(
				(data : IRItemCategory) => {
					expect(data.categories.length).toBe(fakeData.categories.length, 'should have expected no. of item categories');
				}
			);
		})));

		it('getItemCategories: should be 404 returning no item categories', async(inject([], () => {
			const resp = new Response(new ResponseOptions({ status : 404, body : { error : 'No content in database' } }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			editorService.getItemCategories().subscribe(
				(data : IRItemCategory) => { },
				(error : string) => {
					expect(error).toBe('No content in database', 'should have no item categories');
				}
			);
		})));

		it('getItems: should have expected fake items', async(inject([], () => {
			const fakeData : IRItem = makeItemsData();
			const resp = new Response(new ResponseOptions({ status : 200, body : fakeData }));
			backend.connections.subscribe((c : MockConnection) => c.mockRespond(resp));

			editorService.getItems().subscribe(
				(data : IRItem) => {
					expect(data.items.length).toBe(fakeData.items.length, 'should have expected no. of items');
				}
			);
		})));

		it('getItems: should be 404 returning no items', async(inject([], () => {
			const resp = new Response(new ResponseOptions({ status : 404, body : { error : 'No content in database' } }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			editorService.getItems().subscribe(
				(data : IRItem) => { },
				(error : string) => {
					expect(error).toBe('No content in database', 'should have no items');
				}
			);
		})));

		it('getTextures: should have expected fake textures', async(inject([], () => {
			const fakeData : IRTexture = makeTexturesData();
			const resp = new Response(new ResponseOptions({ status : 200, body : fakeData }));
			backend.connections.subscribe((c : MockConnection) => c.mockRespond(resp));

			editorService.getTextures().subscribe(
				(data : IRTexture) => {
					expect(data.textures.length).toBe(fakeData.textures.length, 'should have expected no. of textures');
				}
			);
		})));

		it('getTextures: should be 404 returning no textures', async(inject([], () => {
			const resp = new Response(new ResponseOptions({ status : 404, body : { error : 'No content in database' } }));
			backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

			editorService.getTextures().subscribe(
				(data : IRTexture) => { },
				(error : string) => {
					expect(error).toBe('No content in database', 'should have no textures');
				}
			);
		})));
	});
});
