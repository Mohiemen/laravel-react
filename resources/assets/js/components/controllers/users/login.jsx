'use strict';

import React from 'react'

import BaseComponent from '../../base-component.jsx'

import { Input, Glyphicon, Button, Row } from 'react-bootstrap'

export default class Login extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            remember: false
        };

        this.registerEventHandlers({
            'change': this.formChange,
            'submit': this.formSubmit
        });
    }

    render() {
        return (
            <div className="main">
                <div className="container">
                    <h1>Log in to Bromate</h1>
                    <hr/>
                    <form id="login-form" role="form" onSubmit={this.eventHandler('submit')}>
                        <Row>
                            <div className="form-group col-md-6">
                                <Input type="email" ref="email" onChange={this.eventHandler('change')}
                                       value={this.state.email} label="E-mail Address" />
                            </div>
                            <div className="form-group col-md-6">
                                <Input type="password" ref="password" onChange={this.eventHandler('change')}
                                       value={this.state.password} label="Password" />
                            </div>
                        </Row>
                        <div className="form-group text-center">
                            <Input type="checkbox" ref="remember" onChange={this.eventHandler('change')}
                                   value={this.state.remember} label="Remember Me" />
                            <Button type="submit" bsStyle="success" bsSize="large" block>
                                <Glyphicon glyph="lock" /> Log In
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    formChange() {
        this.setState({
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue(),
            remember: this.refs.remember.getChecked()
        });
    }

    formSubmit(event) {
        event.preventDefault();
        var formData = {
            email: this.state.email,
            password: this.state.password,
            remember: this.state.remember
        };
        console.log(formData);
        return false;
    }
}