'use strict';

import React from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

export default class UINavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeHref: window.location.pathname };
	}
	/** Pass requests along to the router **/
	handleSelect(key, href) {
		browserHistory.push(href);
		this.state.activeHref = href;
		return false;
	}
	/** Handle Clicks (brand) **/
	handleClick(e) {
		e.preventDefault();
		return this.handleSelect(0, e.currentTarget.dataset.href);
	}
	/** Render the Navbar **/
	render() {
		return (
			<Navbar inverse>
				<Navbar.Header>
					<Navbar.Brand>
						<a onClick={this.handleClick.bind(this)} data-href="/">{this.props.title}</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav activeHref={this.state.activeHref} onSelect={this.handleSelect.bind(this)}>
						<NavItem eventKey={1} href="/">
							<Glyphicon glyph="home" /> &nbsp; Home
						</NavItem>
						<NavItem eventKey={2} href="/users">
							<Glyphicon glyph="user" /> &nbsp; Users
						</NavItem>
						<NavItem eventKey={3} href="/news">
							<Glyphicon glyph="bullhorn" /> &nbsp; News
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
	/** Determine if an anchor is active **/
	isActive(href) {
		return browserHistory.href == href;
	}
	activeLink() {
		console.log('Active link check');
		return '/';
	}
}