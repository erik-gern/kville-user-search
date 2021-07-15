const { Octokit } = require('@octokit/core');
const fetch = require('node-fetch');
const fs = require('fs');

const token = fs.readFileSync('github.token', 'utf-8');

const octokit = new Octokit({ auth: token });

const sortBys = ['followers', 'repositories', 'joined', 'best match'];
const orders = ['desc', 'asc'];

module.exports = async function searchUsers(q, page, perPage, sortBy, order) {
	if (sortBy && sortBys.indexOf(sortBy) == -1) {
		throw new Error('sortBy must be one of the following: ' + sortBys.join(', '));
	}
	if (order && orders.indexOf(order) == -1) {
		throw new Error('order must be one of the following: ' + orders.join(', '));
	}
	const options = {
		q: q,
		page: page || 1,
		perPage: perPage || 10,
		sort: sortBy || 'best match',
		order: order || 'desc',
	};
	let searchUrl = '/search/users?' + Object.keys(options)
		.map((k) => { return k + '=' + encodeURIComponent(options[k]); })
		.join('&');
	const searchResp = await octokit.request(`GET ${searchUrl}`);
	
	// get additional user info: name, location, etc.
	for (let i = 0; i < searchResp.data.items.length; i++) {
		let item = searchResp.data.items[i];
		const userResp = await octokit.request('GET /users/{username}', { username: item.login});
		searchResp.data.items[i] = {
			...searchResp.data.items[i],
			...userResp.data
		};
	}
	
	return [
		searchResp.data.items,
		searchResp.data.total_count
	];
}