'use strict';

import React from 'react'

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.events = {};
    }

    registerEventHandler(name, callback) {
        this.events[name] = callback.bind(this);
    }

    registerEventHandlers(handlers) {
        for(var name in handlers) {
            if(handlers.hasOwnProperty(name)) {
                this.registerEventHandler(name, handlers[name]);
            }
        }
    }

    eventHandler(name) {
        return this.events[name];
    }
}