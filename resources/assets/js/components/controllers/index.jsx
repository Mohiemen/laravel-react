'use strict';

import React from 'react';

import { PageHeader, Col, Row, Grid, Panel } from 'react-bootstrap'

export default class Index extends React.Component {
	render() {
		return (
			<div className="main">
				<Grid>
					<Row>
						<Col xs={12}>
							<PageHeader>
								Bromate <small>React. XHP. Hack. Laravel. Simple.</small>
							</PageHeader>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<Panel header="What is Bromate?">
								<p>
									<b>Bromate</b> is an all-inclusive development stack that encompasses React, React-Router, Bootstrap, and Laravel with Hack+HHVM. 
									<b>Bromate</b> makes use of the newest technologies and methods to bring you a stack that is easy to develop with. 
									Live on the bleeding edge. We'll protect you from breaking changes.
								</p>
							</Panel>
						</Col>
						<Col md={6}>
							<Panel header="Why Bromate?">
								<b>Bromate</b> covers all the bases. Stop spending time configuring your dependencies and start coding now.
								<b>Bromate</b> supports Hack & XHP, allowing you to do things asynchronously and waste less energy.
							</Panel>
						</Col>
					</Row>
					<hr/>
					<Row>
						<Col md={4}>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pellentesque viverra elit, et ornare quam placerat in. Pellentesque nulla massa, lobortis semper dapibus vel, convallis non massa. Quisque porttitor scelerisque enim, at ornare dolor semper quis. Praesent nec odio facilisis, bibendum dui et, porta ex. Aliquam vel urna pellentesque, iaculis velit id, iaculis enim. Aenean ultrices nibh ut purus congue eleifend. Nulla consequat feugiat odio, id sagittis turpis porttitor quis. Quisque rutrum posuere magna, quis suscipit nibh pretium eget. Integer eu semper dolor, at laoreet purus. Duis vitae cursus ipsum. Maecenas eu ex mi.</p>
						</Col>
						<Col md={4}>
							<p>Proin turpis ante, fermentum et ante et, pharetra maximus tellus. Aliquam eros ipsum, scelerisque eget urna at, aliquet rhoncus ante. Donec consequat libero arcu. Vivamus magna purus, faucibus mattis sem et, vehicula tempus ex. Praesent cursus porttitor turpis, at dapibus nulla ultrices vitae. Vivamus venenatis nibh odio, eu pulvinar lacus pharetra nec. Quisque sed dapibus quam. Aenean porttitor, odio eu vehicula lobortis, leo nulla cursus arcu, eget sollicitudin neque justo a felis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque posuere sapien tellus, non dignissim mi egestas ut. Aliquam aliquam odio quis tellus fringilla, sit amet posuere lorem viverra. Nulla sed ligula viverra, ullamcorper purus eu, iaculis erat. In hac habitasse platea dictumst. Morbi et lectus ex. Mauris eu dictum nisl.</p>
						</Col>
						<Col md={4}>
							<p>Morbi placerat mollis consequat. In ornare urna tristique facilisis lobortis. Nulla vel tellus ultricies, vulputate diam sit amet, aliquet erat. Nam scelerisque magna id ex porttitor varius. Donec quis facilisis nibh. Curabitur non tortor magna. Sed vel tortor dui. Phasellus eu felis ut est consequat commodo in quis lectus. Curabitur mauris ex, cursus sit amet iaculis ultrices, ornare a libero. Morbi at vestibulum erat, at condimentum lacus. Vivamus vehicula nisl vel tempor congue. Nunc tellus arcu, pharetra eu mi nec, luctus aliquam nisl. In ac sagittis metus.</p>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}