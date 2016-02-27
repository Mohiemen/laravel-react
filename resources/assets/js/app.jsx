'use strict';

import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { render } from 'react-dom'

import App from './components/app.jsx'
import NoMatch from './components/no-match.jsx'

import Index from './components/controllers/index.jsx'

import Users from './components/controllers/users/index.jsx'
import UsersDetails from './components/controllers/users/details.jsx'

import NewsIndex from './components/controllers/news/index.jsx'
import NewsArticlesCreate from './components/controllers/news/articles/create.jsx'

window.route_parts = location.href.split('/');
window.base_url = window.route_parts[0] + '//' + window.route_parts[2];

render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Index}/>
			<Route path="/users" component={Users}/>
			<Route path="/users/:userId" component={UsersDetails}/>

			<Route path="/news" component={NewsIndex}/>
			<Route path="/news/articles/create" component={NewsArticlesCreate}/>

			<Route path="*" component={NoMatch}/>
		</Route>
	</Router>
), document.getElementById('app'));