const Paginator = require('../../lib/components/Paginator');
const { expect } = require('chai');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

describe('components/Paginator()', function(){
	
	it('renders page stats correctly when results are present', function(){
		let dom = Paginator({
			page: 1, numPages: 100, totalResults: 1000
		});
		expect(dom).to.be.an('object');
		let html = ReactDOMServer.renderToString(dom);
		html = html.replace(/\<\!\-\- \-\-\>/gi, '');
		expect(html).to.contain('Page 1 of 100 (1000 total results)');
	});		

	it('renders nothing with no results', function(){
		let dom = Paginator({
			page: 0, numPages: 0, totalResults: 0
		});
		expect(dom).to.equal('');
	});

});