const express = require('express');
const searchUsers = require('./src/searchUsers');

let port = 80;
if (process.argv.length > 2) {
	let portArgs = process.argv.filter((a) => {
		return /^\-\-port\=/.test(a);
	});
	if (portArgs.length > 0) {
		port = portArgs[0].split('=')[1];
	}
}
const app = express();

app.use(express.static('build'));

app.get('/search', async (req, resp) => {
	const q = req.query.q;
	const page = req.query['page'];
	const perPage = req.query['per-page'];
	const sortBy = req.query['sort-by'];
	const order = req.query['order'];
	[users, total] = await searchUsers(q, page, perPage, sortBy, order);
	resp.send({
		'users': users,
		'total': total,
	});
});

app.listen(port, async () => {
	console.log(`app listening on port ${port}`);
});