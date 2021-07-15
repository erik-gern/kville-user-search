const React = require('react');
const ReactDOM = require('react-dom');

module.exports = function Paginator({ page, numPages, totalResults }) {
	if (totalResults == 0) {
		return (
			<p className="text-center"><i>No results found</i></p>
		);
	}
	else {
		return (
			<div className="row mb-2">
				<div className="col-sm-3 text-start">
					<button type="button" className="btn btn-sm btn-outline-secondary">
						<i className="bi-chevron-compact-left"></i>
						Previous
					</button>
				</div>
				<div className="col-sm-6 text-center">
					<i>Page {page} of {numPages} ({totalResults} total results)</i>
				</div>
				<div className="col-sm-3 text-end">
					<button type="button" className="btn btn-sm btn-outline-secondary">
						Next
						<i className="bi-chevron-compact-right"></i>
					</button>
				</div>
			</div>
		);
	}
};
