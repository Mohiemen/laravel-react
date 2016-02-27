'use strict';

import React from 'react'
import ReactQuill from 'react-quill'
import jQuery from 'jquery'
import Dropzone from 'react-dropzone'

export default class NewsArticlesCreate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: [],
			content: '',
			slug: '',
			file: false,
			hasFile: false,
			assets: []
		};
	}

	onTitleChange(e) {
		var slug = e.target.value.replace(/([^a-zA-Z0-9]+)/ig, '-');
		if(slug.substr(-1,1) == '-') slug = slug.substr(0,slug.length-1);

		jQuery.post({
			url: '/api/news/article-make-slug',
			data: { slug: slug },
			method: 'POST',
			dataType: 'json',
			success: ((res) => {
				if(res.slug) {
					this.setState({ slug: res.slug })
				} else {
					this.setState({ error: 'Unable to validate slug... Check your internet connection and refresh.' });
				}
			}).bind(this),
			failure: ((res) => {
				this.setState({ error: res.message });
			}).bind(this)
		});
	}

	onContentChange(value) {
		this.setState({ text:value });
	}

	componentDidMount() {
	}

	onDrop(file) {
		this.setState({ file: file[0], hasFile: true }, () => {
			this.uploadImage();
		});
	}

	uploadImage() {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/news/upload');

		xhr.onload = () => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				var res = JSON.parse(xhr.responseText);
				if(res.status == 'success') {
					this.state.assets.push({url: res.url});
					this.setState({
						assets:this.state.assets,
						hasFile: false,
						file: false
					});
				}
			}
		};

		var form = new FormData();
		form.append('file', this.state.file);
		xhr.send(form);
	}

	render() {
		return (
			<div className="main">
				<div className="container">
					<h1>Create News Article</h1>
					<hr/>
					<form role="form" id="news-article-create">
						<div className="row">
							<div className="form-group col-md-4">
								<label htmlFor="title">Article Title</label>
								<input type="text" id="title" className="form-control" 
									onBlur={this.onTitleChange.bind(this)}/>
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="slug">Article URL</label>
								<div className="input-group">
									<span className="input-group-addon">
										{window.base_url}/article/
									</span>
									<input type="text" id="slug" value={this.state.slug} 
										className="form-control" disabled />
								</div>
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="category">Category</label>
								<select id="category" defaultValue={0} className="form-control">
									<option value={0}>General News</option>
									{this.state.categories.map(function(category) {
										return (<option value={category.id}>{category.title}</option>);
									})}
								</select>
							</div>
						</div>
						<div className="row">
							<div className="col-md-9">
								<div className="form-group">
									<label htmlFor="excerpt">Excerpt</label>
									<textarea id="excerpt" rows={3} className="form-control"
										placeholder="If left blank, excerpt will be populated automatically.">
									</textarea>
								</div>

								<div className="form-group">
									<label>Content</label>
									<ReactQuill styles={{height:300}} id="editor" theme='snow' 
										value={this.state.content} onChange={this.onTextChange} />
								</div>
							</div>
							<div className="col-md-3">
								<div className="panel panel-default">
									<div className="panel-heading">
										<i className="fa fa-web"></i> <strong>Draft Options</strong>
									</div>
									<div className="panel-body">
										<button className="btn btn-primary btn-block">
											<i className="fa fa-calendar"></i> &nbsp; Revision History
										</button>
										<button className="btn btn-default btn-block">
											<i className="fa fa-eye"></i> &nbsp; Preview Article
										</button>
									</div>
								</div>

								<div className="form-group">
									<Dropzone className="dropzone animated infinite pulse" activeClassName="active" onDrop={this.onDrop.bind(this)}>
										<div>
											Drag and drop images or click to browse and upload. 
											Uploaded images can be used in your article or selected as a cover photo.
										</div>
									</Dropzone>
									<div className={this.state.hasFile ? '' : 'hidden'}>
										<hr/>
										<div className="well">
											<img src={this.state.file.preview} className="img-thumbnail" />
											<div className="label label label-primary label-lg">
												<i className="fa fa-spinner fa-spin"></i> &nbsp; Uploading Image...
											</div>
										</div>
									</div>
									<div className={this.state.assets.length ? '' : 'hidden'}>
										<hr/>
										<div className="panel panel-default">
											<div className="panel-heading">
												<i className="fa fa-gallery"></i> <strong>Assets</strong>
											</div>
											<div className="panel-body">
												<div className="row">
													{this.state.assets.map(function(asset) {
														return (
															<div className="col-md-6 text-center">
																<img className="img-thumbnail" src={window.base_url + '/' + asset.url} />
															</div>
														);
													})}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="panel panel-default">
									<div className="panel-heading">
										<i className="fa fa-globe"></i> <strong>Publish Options</strong>
									</div>
									<div className="panel-body">
										<div className="checkbox">
											<label>
												<input id="homepage" type="checkbox" value="1"/> 
												Show on Homepage?
											</label>
										</div>
										<button type="submit" className="btn btn-success btn-block">
											<i className="fa fa-plus"></i> Create Article
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}