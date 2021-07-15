const React = require('react');
const Paginator = require('./Paginator');
const SearchBar = require('./SearchBar');

module.exports = class AppManager extends React.Component {
	state = {
		users: [],
		page: 1,
		perPage: 10,
		totalUsers: 0,
		isFetching: false,
	};

	constructor(props) {
		super(props);
		this.onPreviousPage = this.onPreviousPage.bind(this);
		this.onNextPage = this.onNextPage.bind(this);
		this.onSearchUpdate = this.onSearchUpdate.bind(this);
	}
	
	async fetchUsers () {
		this.isFetching = true;
		//[users, totalUsers] = searchUsers();
		const page = 1;
		const users = [];
		for (let i = 0; i < this.props.perPage; i++) {
			users.push({
				name: 'Generate User #' + (i + 1),
				description: 'A generated user for testing',
				url: 'http://google.com',
				email: `user${i}@email.com`
			});
		}
		const totalUsers = 20;
		this.isFetching = false;
		this.setState({ page, users, totalUsers });
	}
	
	onSearchUpdate(params) {
		this.setState(params);
		this.fetchUsers();
	}
	
	onPreviousPage() {
		this.setState({ currentPage: this.state.currentPage - 1 });
		fetchUsers();
	}
	
	onNextPage() {
		this.setState({ currentPage: this.state.currentPage + 1 });
		fetchUsers();
	}
	
	render() {
		return (
			<div className="container mt-3 mb-3">
				<h1 className="text-center mb-3">Kville - GitHub User Search</h1>
				
				<SearchBar onUpdate={this.onSearchUpdate} onSubmit={this.onSearchUpdate} />
				
				{/* results */}
				{
					this.state.numResults > 0 ? (<React.Fragment>
						<Paginator page={this.state.page} 
							numPages={Math.ceil(this.state.totalUsers / this.state.perPage)} 
							totalResults={this.state.totalUsers} 
							onPrevious={this.onPreviousPage} 
							onNext={this.onNextPage} />

						<ul className="list-group mb-3">
						{
							this.state.users.forEach((user) => {
								return (<li className="list-group-item">
									<h3>{user.name}</h3>
									<p>{user.description}</p>
									<a href={user.url}>Repos</a>
									<a href={'mailto:'+user.email}>{user.email}</a>
								</li>);
							})
						}
						</ul>
						
						<Paginator page={this.state.page} 
							numPages={Math.ceil(this.state.totalUsers / this.state.perPage)} 
							totalResults={this.state.totalUsers} 
							onPrevious={this.onPreviousPage} 
							onNext={this.onNextPage} />

					</React.Fragment>)
					: (
						<p className="text-center"><i>No results found for "foo bar baz"</i></p>
					)
				}
				
								
				{/* spinner */}
				<div className="d-flex justify-content-center">
					<div className="spinner-grow" role="status">
						<span className="visually-hidden">Loading Results...</span>
					</div>
				</div>
				
				{/* error message */}
				<div className="alert alert-danger alert-dismissible">
					Something went wrong getting the search results!
					<button type="button" className="btn-close" aria-label="Close"></button>
				</div>
			</div>
		)
	}
}