const express = require('express');
const app = express();
const port = 8800;

app.use(express.static('build'));

app.get('/search', (req, resp) => {
	resp.send({
		'status': 'OK',
	});
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});