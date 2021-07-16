const React = require('react');
const Paginator = require('./Paginator');
const SearchBar = require('./SearchBar');
const UserList = require('./UserList');

module.exports = class AppManager extends React.Component {
	state = {
		isFresh: true,
		users: [],
		q: '',
		page: 1,
		perPage: 10,
		sortBy: 'best match',
		order: 'desc',
		totalUsers: 0,
		isFetching: false,
		showError: false,
	};

	constructor(props) {
		super(props);
		this.onPreviousPage = this.onPreviousPage.bind(this);
		this.onNextPage = this.onNextPage.bind(this);
		this.onSearchUpdate = this.onSearchUpdate.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.doHideError = this.doHideError.bind(this);
	}
	
	_fetchUsers () {
		this.setState({ isFetching: true, isFresh: false });
		// simulate ajax request
		setTimeout(() => {
			// throw an error occasionally
			if (Math.random() > .9) {
				this.setState({ showError: true, isFetching: false, users: [] });
				return;
			}
			// if no error is being tested, generate results
			const users = [];
			for (let i = 0; i < this.state.perPage; i++) {
				users.push({
					name: 'Generate User #' + (i + 1),
					description: 'A generated user for testing',
					url: 'http://google.com',
					email: `user${i}@email.com`
				});
			}
			const totalUsers = 300;
			this.setState({ isFetching: false, users, totalUsers });			
		}, 500);
	}
	
	async fetchUsers() {
		this.setState({ isFresh: false, isFetching: true });
		try {
			const getParams = {
				q: this.state.q,
				page: this.state.page,
				perpage: this.state.perPage,
				sortby: this.state.sortBy,
				order: this.state.order,
			};
			const resp = await fetch('/search?' + 
				Object.keys(getParams)
					.map((k) => { return k + '=' + encodeURIComponent(getParams[k]); })
					.join('&')
			);
			const json = await resp.json();
			console.log(resp, json);
			this.setState({ 
				isFetching: false, 
				users: json.users,
				totalUsers: json.total,
			});
		}
		catch (e) {
			this.setState({
				isFetching: false,
				showError: true,
				users: [],
			});
		}
	}
	
	getTotalPages() {
		return Math.ceil(this.state.totalUsers / this.state.perPage);
	}
	
	doHideError(e) {
		e.preventDefault();
		this.setState({ showError: false });
	}
	
	onSearchUpdate(params) {
		this.setState(params);
	}
	
	onSearchSubmit(params) {
		this.setState(params);
		setTimeout(() => { this.fetchUsers(); }, 100);
	}
	
	onPreviousPage() {
		this.setState({ page: this.state.page - 1 });
		setTimeout(() => { this.fetchUsers(); }, 100);
	}
	
	onNextPage() {
		this.setState({ page: this.state.page + 1 });
		setTimeout(() => { this.fetchUsers(); }, 100);
	}
	
	render() {
				
		return (
			<div className="container mt-3 mb-3">
				<h1 className="text-center mb-3">Kville - GitHub User Search</h1>
				
				<SearchBar 
					q={this.state.q}
					perPage={this.state.perPage}
					sortBy={this.state.sortBy}
					order={this.state.order}
					onUpdate={this.onSearchUpdate} 
					onSubmit={this.onSearchSubmit} />
				
				{!this.state.isFresh && (<React.Fragment>
					
					{/* error message */}
					{this.state.showError && (<div className="alert alert-danger alert-dismissible">
						Something went wrong getting the search results!
						<a className="btn-close" aria-label="Close" onClick={this.doHideError}></a>
					</div>)}
					
					{/* results */}
					{this.state.totalUsers > 0 && (
						<Paginator page={this.state.page} 
							numPages={this.getTotalPages()} 
							totalResults={this.state.totalUsers} 
							onPrevious={this.onPreviousPage} 
							onNext={this.onNextPage} />
					)}

					{this.state.isFetching && (
						<div className="d-flex justify-content-center">
							<div className="spinner-grow" role="status">
								<span className="visually-hidden">Loading Results...</span>
							</div>
						</div>
					)}
					
					{!this.state.isFetching && (<React.Fragment>
						{this.state.totalUsers > 0 ? (
							<UserList users={this.state.users} />
						) : (
							<p className="text-center"><i>No results found</i></p>
						)}
					</React.Fragment>)}
					
						
					{this.state.totalUsers > 0 && (
						<Paginator page={this.state.page} 
							numPages={this.getTotalPages()} 
							totalResults={this.state.totalUsers} 
							onPrevious={this.onPreviousPage} 
							onNext={this.onNextPage} />
					)}
					
					
				</React.Fragment>)}
				
			</div>
		)
	}
}