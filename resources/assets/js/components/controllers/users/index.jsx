'use strict'

import React from 'react'
import jQuery from 'jquery'
import { Link } from 'react-router'

export default class UsersIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	render() {
		return (
			<div className="container">
				<h2>Users</h2>
				<hr/>
				<ul className="list-group">
				{this.state.users.map(function(user) {
					return (
						<li className="list-group-item" key={user.id}>
							<Link to={"/users/" + user.id}>
								{user.name} ({user.email})
							</Link>
						</li>
					);
				})}
				</ul>
			</div>
		)
	}

	componentDidMount() {
		jQuery.ajax({
			method: 'GET',
			url: '/api/users',
			success: function(res) {
				this.setState({ users: res.data });
			}.bind(this),
			failure: function() {
				this.setState({ error: true });
			}.bind(this),
			dataType: 'json'
		});
	}
}