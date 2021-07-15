const SearchBar = require('../../lib/components/SearchBar');
const { expect } = require('chai');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

describe('components/SearchBar', function(){
	
	let searchBar;
	let updates;
	let submits;
	let onUpdate = function(params){
		updates.push(params);
	};
	let onSubmit = function(params){
		submits.push(params);
	};
	beforeEach(function(){
		updates = [];
		submits = [];
		searchBar = new SearchBar({ onUpdate, onSubmit });
	});
	
	describe('::constructor()', function(){
		it('creates an instance of the SearchBar', function(){
			expect(searchBar).to.be.an.instanceof(SearchBar);
		});
	});
	
	describe('::render()', function(){
		it('renders the search bar', function(){
			let dom = searchBar.render();
			expect(dom).to.be.an('object');
			let html = ReactDOMServer.renderToString(dom);
			html = html.replace(/\<\!\-\- \-\-\>/gi, '');
			expect(html).to.contain('Enter a username or email address...');
		});
	});
	
	describe('::onUpdate()', function(){
		
	});
	
	describe('::onSubmit()', function(){
		
	});
	
	describe('::onExpand()', function(){
		it('sets the state to expanded=true', function(done){
			searchBar.onExpand();
			// pause for state propagation
			setTimeout(function(){
				expect(searchBar.state.expanded).to.be.true;	
				done();			
			}, 10);
		});
	});
	
	describe('::onContract()', function(){
		it('sets the state to expanded=false', function(done){
			searchBar.onContract();
			// pause for state propagation
			setTimeout(function(){
				expect(searchBar.state.expanded).to.be.false;	
				done();			
			}, 10);
		});		
	});
	

});