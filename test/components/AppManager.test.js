const AppManager = require('../../lib/components/AppManager');
const { expect } = require('chai');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

describe('components/AppManager', function(){
	
	let appManager;
	beforeEach(function(){
		appManager = new AppManager({});
	});
	
	describe('::constructor()', function(){
		it('builds an AppManager instance', function(){
			expect(appManager).to.be.an.instanceof(AppManager);
		})
	});
	
	describe('::render()', function(){
		it('renders', function(){
			let dom = appManager.render();
			let html = ReactDOMServer.renderToString(dom);
			// sanity test
			expect(html).to.contain('<div');
		});		
	})

});