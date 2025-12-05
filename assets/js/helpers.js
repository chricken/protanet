"use strict"

const helpers = {
    counter: 1,
    createNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    createID() {
        let id = this.createNumber(1e3, 1e6).toString(36) + '_';
        id += Date.now().toString(36) + '_';
        id += this.counter.toString(36);
        return id;
    }
}

export default helpers