const { Octokit } = require('@octokit/core');

const octokit = new Octokit();

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
	const octoResp = await octokit.request(`GET ${searchUrl}`);
	return [
		octoResp.data.items,
		octoResp.data.total_count
	];
}