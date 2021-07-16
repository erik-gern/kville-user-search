const cutoffs = [
	['years', 1000 * 3600 * 24 * 365],
	['days', 1000 * 3600 * 24],
	['hours', 1000 * 3600],
	['minutes', 1000 * 60],
	['seconds', 1000],
];

module.exports = function timeElapsed(d) {
	if (typeof d == 'string') {
		d = Date.parse(d);
	}
	d = new Date(d);
	const ms = d.getTime();
	if (ms < 5000) {
		return 'just now';
	}
	for (let i = 0; i < cutoffs.length; i++) {
		const [term, duration] = cutoffs[i];
		const count = Math.floor((Date.now() - ms) / duration);
		if (count >= 2) {
			return `${count} ${term} ago`;
		}
	}
	return 'unknown';
}