const UserList = require('../../lib/components/UserList');
const { expect } = require('chai');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

describe('components/UserList()', function(){
	
	const testUsers = [];
	for (let i = 0; i < 10; i++) {
		testUsers.push({
			id: i,
			login: 'user_'+i,
			html_url: 'http://example.com/'+i,
			avatar_url: 'http://image.example.com/'+i,
			public_repos: 10,
			public_gists: 9,
			followers: 5,
			following: 4,
			created_at: '2017-02-01T11:38:58Z',
			updated_at: '2017-02-01T11:38:58Z',
			name: 'Test User'+i,
			company: 'Test Company',
			blog: 'http://blog.example.com',
			email: 'user'+i+'@email.com',
			twitter_username: 'twitteruser_'+i,
			location: 'Somewhere, United States',
			bio: 'This is a generated user for testing purposes.',
			hireable: false,
		})
	}
	
	it('renders a list of users', function(){
		let dom = UserList({
			users: testUsers
		});
		expect(dom).to.be.an('object');
		let html = ReactDOMServer.renderToString(dom);
		html = html.replace(/\<\!\-\- \-\-\>/gi, '');
		expect(html).to.contain('This is a generated user for testing purposes');
	});		

});