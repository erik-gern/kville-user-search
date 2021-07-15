const React = require('react');

module.exports = class SearchBar extends React.Component {
	state = {
		q: '',
		expanded: false,
	};
	
	constructor(props) {
		super(props);
		this.onUpdate = this.onUpdate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onExpand = this.onExpand.bind(this);
		this.onContract = this.onContract.bind(this);
	}
	
	onUpdate() {
		this.props.onUpdate(this.state);
	}
	
	onSubmit() {
		this.props.onSubmit(this.state);
	}
	
	onExpand() {
		this.setState({ expanded: true });
	}
	
	onContract() {
		this.setState({ expanded: false });
	}
	
	render () {
		return (
			<div className="mb-3">
				<div className="input-group mb-3">
					<input 
						type="text" 
						className="form-control form-control-lg"
						placeholder="Enter a username or email address..." 
						value={this.state.q} 
						onChange={this.onUpdate} />
					<button className="btn btn-primary" 
						type="submit" 
						onClick={this.onSubmit}>
						Search
					</button>
					<button className="btn btn-secondary" 
						type="button" 
						title="More Options" 
						onClick={this.onExpand}>
						<i className="bi-gear"></i>
					</button>
				</div>
				{this.state.expanded && (
					<div className="card">
						<div className="card-body">
							<button type="button" 
								className="btn-close float-right close-options" 
								aria-label="Close"
								onClick={onContract}>
							</button>
							<div className="row">
								<div className="col-4">
									<label htmlFor="perPage" className="form-label">Results per page:</label>
									<input className="form-control" type="number" min="1" max="100" id="perPage" />
								</div>
								<div className="col-4">
									<label htmlFor="sortBy" className="form-label">Sort By:</label>
									<select className="form-control" id="sortBy">
										<option>Best Match</option>
									</select>
								</div>
								<div className="col-4">
									<label htmlFor="order" className="form-label">Order:</label>
									<select className="form-control" id="order">
										<option>Descending</option>
										<option>Ascending</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}