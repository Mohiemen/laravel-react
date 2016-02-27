'use strict';

import React from 'react'

export default class NoMatch extends React.Component {
	render() {
		return (
			<div className="container">
				<h1 className="page-heading">404</h1>
				<hr/>
				<p>Unable to locate the requested resource.</p>
			</div>
		);
	}
}