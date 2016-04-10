import React from 'react'
export default class Debouncer extends React.Component {
    constructor() {
        super();
        this.waiting = {};
        this.timers = {};
        this.iterations = 0;
        this.debounceCheck = this.debounceCheck.bind(this);
        setInterval(this.debounceCheck.bind(this), 100);
    }

    debounce(callback, id, timer) {
        return (e) => {
            var event = {};
            for(var x in e) {
                if(e.hasOwnProperty(x)) {
                    event[x] = e[x];
                }
            }
            if(typeof(this.waiting[id]) == 'undefined') {
                this.waiting[id] = [];
            }
            let params = [id,callback,timer,event];
            if(this.waiting[id].length >= 1) {
                this.waiting[id] = [
                    this.waiting[id].shift(),
                    params
                ]
            } else {
                this.waiting[id].push(params);
            }
        };
    }
    
    debounceCheck() {
        for(var id in this.waiting) {
            if (this.waiting.hasOwnProperty(id)) {
                // Get the task from the waiting list
                let run = false;
                let task = false;

                if (typeof(this.timers[id]) == 'undefined') {
                    task = this.waiting[id].shift();
                    if(task) {
                        this.timers[id] = {
                            last: this.iterations,
                            next: this.iterations + (task[2] / 100),
                            waiting: 0
                        };
                        run = true;
                    }
                } else if (this.iterations >= this.timers[id].next) {
                    task = this.waiting[id].shift();
                    if(task) {
                        this.timers[id] = {
                            last: this.iterations,
                            next: this.iterations + (task[2] / 100)
                        };
                        run = true;
                    }
                }

                if(run) {
                    let callback = task[1];
                    let e = task[3];

                    // Run the callback
                    callback(e);
                }
            }
        }
        this.iterations++;
    }

    shiftTask(id) {
        return this.waiting[id].shift();
    }
}