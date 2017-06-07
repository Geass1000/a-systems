import { HelperClass } from './helper.class';

describe('Testing class HelperClass', function() {

  it('prepareData: should display 0', function() {
		let data : number = -100;
		data = HelperClass.prepareData(data, 0, 255);
    expect(data).toBe(0);
  });
});
