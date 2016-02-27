'use strict';

import React from 'react'
import jQuery from 'jquery'

export default class UsersDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: { name: 'Loading...' }
		};
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<h2>User Sidebar</h2>
						<hr/>
						<div className="well">
							<p>This is stuff.</p>
						</div>
					</div>
					<div className="col-md-9">
						<h3>{this.state.user.name} <span className="small">({this.state.user.email})</span></h3>
						<hr/>
						<p>It's a user!</p>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		jQuery.ajax({
			url: '/api/users/user/' + this.props.params.userId,
			method: 'GET',
			dataType: 'json',
			success: function(res) {
				this.setState({ user: res.data });
			}.bind(this),
			failure: function(res) {
				this.setState({ error: res.message });
			}.bind(this)
		});
	}
}