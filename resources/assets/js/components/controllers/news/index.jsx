'use strict';

import React from 'react'
import jQuery from 'jquery'

import { browserHistory } from 'react-router'
import { Nav, NavItem } from 'react-bootstrap'

export default class NewsIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			error: false
		};
	}

	/** Pass requests along to the router **/
	handleSelect(key, href) {
		browserHistory.push(href);
		this.state.activeHref = href;
		return false;
	}

	render() {
		var error = '';
		if(this.state.error) {
			error = (
				<div className="alert alert-danger">
					<b>Error:</b> {this.state.error}
				</div>
			);
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3" style={{marginTop:16,marginBottom:16}}>
						<Nav bsStyle="pills" stacked  
							activeHref={this.state.activeHref} onSelect={this.handleSelect.bind(this)}>
							<NavItem href="/news/articles/create">Create Article</NavItem>
							<NavItem href="/news/categories/create">Create Category</NavItem>
							<NavItem href="/news/tags/create">Create Tag</NavItem>
						</Nav>
					</div>
					<div className="col-md-9">
						<h2>News</h2>
						<hr/>
						{error}
						{this.state.articles.map(function(article) {
							return (
								<div className="row">
									<div className="col-md-3">
										(Image)
									</div>
									<div className="col-md-9">
										<Panel header={article.title}>
											{article.content}
										</Panel>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		jQuery.ajax({
			url: '/api/news/',
			method: 'GET',
			dataType: 'json',
			success: function(res) {
				if(!res.data.length) {
					this.setState({
						error: 'There are no news articles to display!'
					});
					return;
				}

				this.setState({
					articles: res.data
				});
			}.bind(this),
			failure: function(res) {
				this.setState({
					error: res.message
				});
			}.bind(this)
		});
	}
}