const searchUsers = require('../lib/searchUsers');
const { expect } = require('chai');

describe('searchUsers()', function(){
	
	const tests = {
		'successfully returns one result, one page': ['erik-gern', 1, 100, null, null, false, 1, 1],
		'throws on a bad sortBy': ['bad', 1, 1, 'bad', 'desc', true, 0, 0],
		'throws on a bad order': ['bad', 1, 1, 'best match', 'bad', true, 0, 0]
	};
	
	Object.keys(tests).forEach(function(desc){
		const [q, page, perPage, sortBy, order, willThrow, numResults, totalResults] = tests[desc];
		it(desc, function(done){
			let p = searchUsers(q, page, perPage, sortBy, order);
			p.then(function(ret){
				if (willThrow) {
					done('Did not throw');
					return;
				}
				const [users, total] = ret;
				expect(users).to.be.an('array');
				expect(users.length).to.equal(numResults);
				expect(total).to.equal(totalResults);
				done();
			}, function(e){
				if (!willThrow) {
					done(e);
				}
				else {
					done();
				}
			});
		});
	});
});
