const React = require('react');

module.exports = class SearchBar extends React.Component {
	state = {
		q: '',
		perPage: null,
		sortBy: null,
		order: null,
		expanded: false,
	};
	
	constructor(props) {
		super(props);
		this.state = {...this.state,
			perPage: props.perPage,
			sortBy: props.sortBy,
			order: props.order,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onExpand = this.onExpand.bind(this);
		this.onContract = this.onContract.bind(this);
		this.onToggle = this.onToggle.bind(this);
	}
	
	update(key, val) {
		const newState = {};
		newState[key] = val;
		this.setState(newState);
		// debounce
		setTimeout(() => {
			this.props.onUpdate(this.state);
		}, 100);
	}
	
	onSubmit(e) {
		e.preventDefault();
		// debounce this
		setTimeout(() => {
			this.props.onSubmit(this.state);
		}, 100);
	}
	
	onExpand(e) {
		e.preventDefault();
		this.setState({ expanded: true });
	}
	
	onContract(e) {
		e.preventDefault();
		this.setState({ expanded: false });
	}
	
	onToggle(e) {
		e.preventDefault();
		this.setState({ expanded: !this.state.expanded });
	}
	
	render () {
		return (
			<div className="mb-3">
				<form onSubmit={this.onSubmit}>
					<div className="input-group mb-3">
						<input 
							type="text" 
							className="form-control form-control-lg"
							placeholder="Enter a username or email address..." 
							value={this.state.q} 
							onChange={(e) => { this.update('q', e.target.value); }} />
						<button className="btn btn-primary" 
							type="submit" 
							onClick={this.onSubmit}>
							Search
						</button>
						<button className="btn btn-secondary" 
							type="button" 
							title="More Options" 
							onClick={this.onToggle}>
							<i className="bi-gear"></i>
						</button>
					</div>
					{this.state.expanded && (
						<div className="card">
							<div className="card-body">
								<button type="button" 
									className="btn-close float-right close-options" 
									aria-label="Close"
									onClick={this.onContract}>
								</button>
								<div className="row">
									<div className="col-4">
										<label htmlFor="perPage" className="form-label">Results per page:</label>
										<input className="form-control" 
											type="number" 
											min="1" 
											max="100" 
											id="perPage" 
											value={this.state.perPage}
											onChange={(e) => { this.update('perPage', e.target.value); }} />
									</div>
									<div className="col-4">
										<label htmlFor="sortBy" className="form-label">Sort By:</label>
										<select className="form-control" 
											id="sortBy"
											value={this.state.sortBy}
											onChange={(e) => { this.update('sortBy', e.target.value); }}>
											<option value="best match">Best Match</option>
											<option value="followers">Followers</option>
											<option value="repositories">Repos</option>
											<option value="joined">Joined</option>
										</select>
									</div>
									<div className="col-4">
										<label htmlFor="order" className="form-label">Order:</label>
										<select className="form-control" 
											id="order"
											value={this.state.order}
											onChange={(e) => { this.update('order', e.target.value); }}>
											<option value="desc">Descending</option>
											<option value="asc">Ascending</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					)}
				</form>
			</div>
		);
	}
}