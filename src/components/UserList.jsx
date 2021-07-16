const React = require('react');
const timeElapsed = require('../timeElapsed');

module.exports = function UserList (props) {
	return (
		<ul className="list-group mb-3">
			{props.users.map((user) => {
				return (
					<li className="list-group-item">
						<h5 className="card-title"><a href={user.html_url} target="_blank">{user.login}</a></h5>
						<div className="row">
							<div className="col-sm-2">
								<img src={user.avatar_url} className="img-thumbnail" />
							</div>
							<div className="col-sm-10">
								<p>
									<i className="bi-folder"></i> 
									<a href={user.html_url+'?tab=repositories'} target="_blank">
										{user.public_repos} {user.public_repo == 1 ? 'repo' : 'repos'}
									</a><br />
									
									<i className="bi-file-diff"></i> 
									<a href={user.html_url+'?tab=gists'} target="_blank">
										{user.public_gists} {user.public_gists == 1 ? 'gist' : 'gists'}
									</a><br />
									
									<i className="bi-people"></i> 
									<a href={user.html_url+'?tab=followers'} target="_blank">
										{user.followers} {user.followers == 1 ? 'follower' : 'followers'}
									</a><br />
									
									<i className="bi-person-check"></i> 
									<a href={user.html_url+'?tab=following'} target="_blank">
										following {user.following}
									</a>
								</p>
								<p>
									<i>
										Created <abbr title={user.created_at}>{timeElapsed(user.created_at)}</abbr>, 
										last updated <abbr title={user.updated_at}>{timeElapsed(user.updated_at)}</abbr>
									</i>
								</p>
							</div>
						</div>
						
						<table className="table">
							<tbody>
								<tr>
									<td className="text-end"><b>Name:</b></td> 
									<td>{user.name || ''}</td>
								</tr>
								<tr>
									<td className="text-end"><b>Company:</b></td>
									<td>{user.company || ''}</td>
								</tr>
								<tr>
									<td className="text-end"><b>Blog:</b></td> 
									<td>{user.blog && (<a href={user.blog} target="_blank">{user.blog}</a>)}</td>
								</tr>
								<tr>
									<td className="text-end"><b>Email:</b></td>
									<td>{user.email && (<a href={'mailto:'+user.email}>{user.email}</a>)}</td>
								</tr>
								<tr>
									<td className="text-end"><b>Twitter:</b></td> 
									<td>{user.twitter_username && (
										<a href={'https://twitter.com/' + user.twitter_username} target="_blank">
											@{user.twitter_username}
										</a>
									)}</td>
								</tr>
								<tr>
									<td className="text-end"><b>Location:</b></td>
									<td>{user.location || ''}</td>
								</tr>
								<tr>	
									<td className="text-end"><b>Bio:</b></td> 
									<td>{user.bio || ''}</td>
								</tr>
								<tr>
									<td className="text-end"><b>Hireable:</b></td>
									<td>{user.hireable ? 'Yes' : 'No'}</td>
								</tr>
							</tbody>
						</table>
					</li>
				);
			})}
		</ul>
	);
}