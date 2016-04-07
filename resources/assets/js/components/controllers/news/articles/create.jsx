'use strict';

import React from 'react'
import ReactQuill from 'react-quill'
import jQuery from 'jquery'
import Dropzone from 'react-dropzone'
import { PageHeader, Col, Row, Grid, Panel, Input, Button, Glyphicon } from 'react-bootstrap'

export default class NewsArticlesCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            content: '',
            slug: '',
            file: false,
            hasFile: false,
            assets: [],
            titleLoading: false,
            titleWaiting: false
        };

        this.onTitleChange.bind(this);
        this.debounceTitleChange = _.debounce(this.onTitleChange, 250);
    }

    onTitleChange(e) {
        this.setState({titleLoading: true, titleWaiting: true});
        var slug = e.target.value.replace(/([^a-zA-Z0-9]+)/ig, '-');
        if (slug.substr(-1, 1) == '-') slug = slug.substr(0, slug.length - 1);

        window.setTimeout(() => {
            this.setState({titleWaiting: false});
        }, 500);

        $http.post('/api/news/article-make-slug', {slug: slug}, {responseType: 'json'})
            .then(((res) => {
                console.log(res.data.slug);
                this.setState({titleLoading: false});
                if (res.data.slug) {
                    this.setState({slug: res.data.slug})
                } else {
                    this.setState({error: 'Unable to validate slug... Check your internet connection and refresh.'});
                }
            }).bind(this))
            .catch(((res) => {
                console.log(res);
                this.setState({error: res.message, titleLoading: false});
            }).bind(this));
    }

    onContentChange(value) {
        this.setState({content: value});
        return true;
    }

    onDrop(file) {
        this.setState({file: file[0], hasFile: true}, () => {
            this.uploadImage();
        });
    }

    uploadImage() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/news/upload');

        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                if (res.status == 'success') {
                    this.state.assets.push({url: res.url});
                    this.setState({
                        assets: this.state.assets,
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
                <form role="form" id="news-article-create">
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <h1>Create News Article</h1>
                                <hr/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} className="form-group">
                                <Input type="text" label="Article Title" placeholder="Enter a Title"
                                       onKeyUp={this.debounceTitleChange} onBlur={this.debounceTitleChange}/>
                            </Col>
                            <Col md={4} className="form-group">
                                <Input type="text" id="slug" value={this.state.slug} disabled
                                       label="Article URL" addonBefore={"/article/"} addonAfter={(
                                           this.state.titleLoading ? (
                                                <strong><i className="fa fa-spinner fa-spin"></i>&nbsp;</strong>
                                            ) : false
                                        )} />
                            </Col>
                            <Col md={4} className="form-group">
                                <Input type="select" label="Category" value={0}>
                                    <option value={0}>General News</option>
                                    {this.state.categories.map(function (category) {
                                        return (<option value={category.id}>{category.title}</option>);
                                    })}
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={9}>
                                <div className="form-group">
                                    <Input type="textarea" label="Excerpt" rows={3}
                                           placeholder="If left blank, excerpt will be populated automatically"/>
                                </div>

                                <div className="form-group">
                                    <label>Content</label>
                                    <ReactQuill id="editor" theme='snow'
                                                value={this.state.content} onChange={this.onContentChange.bind(this)}/>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <i className="fa fa-web"> </i> <strong>Draft Options</strong>
                                    </div>
                                    <div className="panel-body">
                                        <Button block>
                                            <Glyphicon glyph="calendar"/> &nbsp; Revision History
                                        </Button>
                                        <Button block>
                                            <Glyphicon glyph="eye-open"/> &nbsp; Preview Article
                                        </Button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <Dropzone className="dropzone animated infinite pulse" activeClassName="active"
                                              onDrop={this.onDrop.bind(this)}>
                                        <div>
                                            Drag and drop images or click to browse and upload.
                                            Uploaded images can be used in your article or selected as a cover photo.
                                        </div>
                                    </Dropzone>
                                    <div className={this.state.hasFile ? '' : 'hidden'}>
                                        <hr/>
                                        <div className="well">
                                            <img src={this.state.file.preview} className="img-thumbnail"/>
                                            <div className="label label label-primary label-lg">
                                                <i className="fa fa-spinner fa-spin"> </i> &nbsp; Uploading Image...
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
                                                    {this.state.assets.map(function (asset) {
                                                        return (
                                                            <div className="col-md-6 text-center">
                                                                <img className="img-thumbnail"
                                                                     src={window.base_url + '/' + asset.url}/>
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
                                        <i className="fa fa-globe"> </i> <strong>Publish Options</strong>
                                    </div>
                                    <div className="panel-body text-center">
                                        <Input type="checkbox" label="Show on homepage?"/>
                                        <Button type="submit" bsStyle="success" block>
                                            <Glyphicon glyph="plus"/> Create Article
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </form>
            </div>
        )
    }
}