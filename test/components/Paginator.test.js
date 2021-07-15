const Paginator = require('../../lib/components/Paginator');
const { expect } = require('chai');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

describe('components/Paginator()', function(){
	
	const tests = {
		'renders page stats correctly when results are present': [1, 100, 1000, `Page 1 of 100 (1000 total results)`],
		'renders no results message with no results': [0, 0, 0, 'No results found'],
	};
	
	Object.keys(tests).forEach(function(desc){
		const [page, numPages, totalResults, searchStr] = tests[desc];
		it(desc, function(){
			let dom = Paginator({
				page, numPages, totalResults
			});
			expect(dom).to.be.an('object');
			let html = ReactDOMServer.renderToString(dom);
			html = html.replace(/\<\!\-\- \-\-\>/gi, '');
			expect(html).to.contain(searchStr);
		});		
	})

});