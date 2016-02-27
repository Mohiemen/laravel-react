'use strict';

import React from 'react'

import UINavBar from './ui/navbar.jsx'
import LinkContainer from 'react-router-bootstrap'
import jQuery from 'jquery'

export default class App extends React.Component {
	render() {
		return (
			<div className="app-inner">
				<UINavBar title="Bromate" />
				{this.props.children}
				<footer className="footer inverted">
					<div className="container">
						All content copyright PHENOCode.com &copy; 2012-2016
					</div>
				</footer>
			</div>
		);
	}
}