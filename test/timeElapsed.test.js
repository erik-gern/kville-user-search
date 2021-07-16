const { expect } = require('chai');
const timeElapsed = require('../lib/timeElapsed');

describe('timeElapsed()', function(){
	it('takes an iso-formatted date string', function(){
		const isoStr = '2010-04-16T23:39:23Z';
		const elapsed = timeElapsed(isoStr);
		expect(elapsed).to.be.a('string');
		expect(elapsed).to.contain('years ago');
	});
	
	it('takes a number (ms since Unix epoch)', function(){
		const unixTime = 1000 * 60 * 10; // 10 minutes ago
		const elapsed = timeElapsed(unixTime);
		expect(elapsed).to.be.a('string');
		expect(elapsed).to.contain('minutes ago'); 
	});
});